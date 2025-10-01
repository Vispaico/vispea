import crypto from "node:crypto";

import {
  OrderRequestInput,
  PrintfulWebhookEvent,
  cartItemSchema,
  orderRequestSchema,
  printfulProductSchema,
  printfulWebhookEventSchema,
} from "@/lib/validators";
import { PRODUCT_OVERRIDES } from "@/data/product-overrides";

const PRINTFUL_API_BASE = process.env.PRINTFUL_API_URL ?? "https://api.printful.com";

type ProductListOptions = {
  limit?: number;
  offset?: number;
};

type PrintfulPaging = {
  total: number;
  offset: number;
  limit: number;
};

type SyncProduct = {
  id: number;
  external_id: string | null;
  name: string;
  thumbnail_url: string | null;
  description?: string | null;
  tags?: string[];
};

type SyncVariant = {
  id: number;
  external_id: string | null;
  variant_id: number;
  name: string;
  retail_price: string;
  currency: string;
  files?: Array<{
    type?: string;
    preview_url?: string | null;
    thumbnail_url?: string | null;
  }>;
  product?: {
    image?: string | null;
    name?: string | null;
  };
};

type ProductTemplate = {
  description?: string | null;
  tags?: string[];
};

function extractImages(files: Array<{ type?: string; preview_url?: string | null; thumbnail_url?: string | null; visible?: boolean | null }>) {
  const previewImages = files
    .filter((file) => file.type === "preview" && file.preview_url)
    .map((file) => file.preview_url as string);

  const visibleMockups = files
    .filter((file) => (file.type === "mockup" || file.type === "preview") && file.visible !== false && file.preview_url)
    .map((file) => file.preview_url as string);

  const fallbackImages = files
    .filter((file) => file.preview_url)
    .map((file) => file.preview_url as string);

  return [...previewImages, ...visibleMockups, ...fallbackImages];
}

function mapSyncProduct(
  result: {
    sync_product: SyncProduct;
    sync_variants: SyncVariant[];
  },
  template?: ProductTemplate,
) {
  const overrideKey = result.sync_product.external_id ?? String(result.sync_product.id);
  const override = PRODUCT_OVERRIDES[overrideKey] ?? PRODUCT_OVERRIDES.__default;
  const overrideGallery = override?.gallery && override.gallery.length > 0 ? override.gallery : null;

  const mappedVariants = result.sync_variants.map((variant) => {
    const preferredFiles = (variant.files ?? []).filter((file) =>
      file.type === "preview" || file.type === "mockup" || file.type === "image",
    );

    const variantFiles = variant.files ?? [];

    const gatheredImages = extractImages([...preferredFiles, ...variantFiles]);

    const combinedCandidates = overrideGallery ?? [
      ...gatheredImages,
      ...(variant.product?.image ? [variant.product.image] : []),
    ];

    const uniqueImages = overrideGallery ?? Array.from(new Set(combinedCandidates));

    if (uniqueImages.length === 0 && result.sync_product.thumbnail_url) {
      uniqueImages.push(result.sync_product.thumbnail_url);
    }

    return {
      id: variant.id,
      externalId: variant.external_id,
      variantId: variant.variant_id,
      name: variant.name,
      retailPrice: variant.retail_price,
      currency: variant.currency,
      image: uniqueImages[0] ?? null,
      images: uniqueImages,
    };
  });

  return printfulProductSchema.parse({
    id: result.sync_product.id,
    externalId: result.sync_product.external_id,
    name: result.sync_product.name,
    thumbnailUrl: result.sync_product.thumbnail_url,
    description: override?.descriptionHtml ?? template?.description ?? result.sync_product.description ?? null,
    tags: override?.tags ?? template?.tags ?? result.sync_product.tags ?? [],
    gallery: overrideGallery ?? [],
    sortOrder: override?.sortOrder,
    variants: mappedVariants,
  });
}

function getApiKey() {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) {
    throw new Error("PRINTFUL_API_KEY is not set");
  }
  return key;
}

async function printfulFetch<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Printful request failed: ${response.status} ${errorBody}`);
  }

  return response.json() as Promise<T>;
}

export async function listPrintfulProducts(options: ProductListOptions = {}) {
  const { limit = 12, offset = 0 } = options;
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });

  const summary = await printfulFetch<{
    result: SyncProduct[];
    paging: PrintfulPaging;
  }>(`/sync/products?${params.toString()}`);

  const detailed = await Promise.all(
    summary.result.map((item) =>
      printfulFetch<{
        result: {
          sync_product: SyncProduct;
          sync_variants: SyncVariant[];
          product?: ProductTemplate;
        };
      }>(`/sync/products/${item.id}?include=product`),
    ),
  );

  const products = detailed.map(({ result }) => mapSyncProduct(result, result.product));

  return {
    products,
    paging: summary.paging,
  };
}

export async function listAllPrintfulProducts() {
  const pageSize = 100;
  let offset = 0;
  let total = Infinity;
  const aggregated: Awaited<ReturnType<typeof listPrintfulProducts>>["products"] = [];

  while (aggregated.length < total) {
    const { products, paging } = await listPrintfulProducts({ limit: pageSize, offset });
    aggregated.push(...products);
    total = paging.total;
    if (products.length === 0) break;
    offset += paging.limit;
  }

  return {
    products: aggregated,
    total: aggregated.length,
  };
}

export async function getPrintfulProduct(productId: number) {
  if (!Number.isFinite(productId)) {
    throw new Error("Invalid product id");
  }

  const response = await printfulFetch<{
    result: {
      sync_product: SyncProduct;
      sync_variants: SyncVariant[];
      product?: ProductTemplate;
    };
  }>(`/sync/products/${productId}?include=product`);

  return mapSyncProduct(response.result, response.result.product);
}

export async function submitPrintfulOrder(input: OrderRequestInput) {
  const parsed = orderRequestSchema.parse(input);

  const items = parsed.items.map((item) => {
    const validated = cartItemSchema.parse(item);
    return {
      variant_id: validated.variantId,
      quantity: validated.quantity,
      retail_price: validated.price.toFixed(2),
      name: `${validated.productName} - ${validated.variantName}`,
      files:
        validated.image
          ? [
              {
                type: "preview",
                url: validated.image,
              },
            ]
          : undefined,
    };
  });

  const payload = {
    external_id: parsed.paypalOrderId,
    recipient: {
      name: parsed.recipient.name,
      email: parsed.recipient.email,
      address1: parsed.recipient.address1,
      address2: parsed.recipient.address2 ?? undefined,
      city: parsed.recipient.city,
      state_code: parsed.recipient.state ?? undefined,
      country_code: parsed.recipient.country,
      zip: parsed.recipient.zip,
      phone: parsed.recipient.phone ?? undefined,
    },
    shipping: "STANDARD",
    items,
  };

  const result = await printfulFetch<{ result: { id: number; status: string } }>(
    `/orders`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return result.result;
}

export function verifyPrintfulWebhook(signature: string | null, rawBody: string) {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
  if (!secret || !signature) {
    return false;
  }

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

export function parsePrintfulWebhook(rawBody: string): PrintfulWebhookEvent {
  const json = JSON.parse(rawBody);
  return printfulWebhookEventSchema.parse(json);
}
