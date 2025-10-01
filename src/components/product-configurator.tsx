"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGun, faMousePointer } from "@fortawesome/free-solid-svg-icons";

import type { PrintfulProduct } from "@/lib/validators";
import { useCartStore } from "@/store/cart";

type Props = {
  product: PrintfulProduct;
};

export function ProductConfigurator({ product }: Props) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const variant = useMemo(
    () => product.variants.find((item) => item.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  const images = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    if (variant?.images && variant.images.length > 0) {
      return variant.images;
    }
    if (product.thumbnailUrl) {
      return [product.thumbnailUrl];
    }
    return [];
  }, [variant?.images, product.gallery, product.thumbnailUrl]);

  const defaultImageIndex = useMemo(() => {
    if (product.gallery && product.gallery.length > 1) {
      return 1;
    }
    return 0;
  }, [product.gallery]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(defaultImageIndex);

  useEffect(() => {
    setSelectedImageIndex(defaultImageIndex);
  }, [variant?.id, defaultImageIndex]);

  const price = variant ? Number.parseFloat(variant.retailPrice) : 0;
  const currency = variant?.currency ?? "USD";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);

  const { summaryHtml, extraHtml } = useMemo(() => {
    const description = product.description ?? null;
    if (!description) {
      return { summaryHtml: null, extraHtml: null };
    }

    const marker = "<p><strong>The boring stuff:";
    const markerIndex = description.indexOf(marker);

    if (markerIndex === -1) {
      return { summaryHtml: description, extraHtml: null };
    }

    const summary = description.slice(0, markerIndex).trim();
    const extra = description.slice(markerIndex).trim();

    return {
      summaryHtml: summary.length > 0 ? summary : null,
      extraHtml: extra.length > 0 ? extra : null,
    };
  }, [product.description]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-4">
        <div className="aspect-square w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          {images[selectedImageIndex] ? (
            <Image
              src={images[selectedImageIndex]!}
              alt={variant?.name ?? product.name}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Preview unavailable
            </div>
          )}
        </div>
        {images.length > 1 ? (
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedImageIndex(index)}
                className={`overflow-hidden rounded-xl border ${
                  index === selectedImageIndex
                    ? "border-white"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{product.name}</h1>
          <p className="text-lg font-medium text-white">{formattedPrice}</p>
        </div>

        {product.variants.length > 1 ? (
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Choose a variant</span>
            <select
              value={variant?.id ?? undefined}
              onChange={(event) => setVariantId(Number.parseInt(event.target.value, 10))}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-slate-500 focus:outline-none"
            >
              {product.variants.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ·
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: item.currency,
                    minimumFractionDigits: 2,
                  }).format(Number.parseFloat(item.retailPrice))}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="grid max-w-xs gap-2 text-sm text-slate-300">
          <span>Quantity</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number.parseInt(event.target.value, 10) || 1))}
            className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          disabled={!variant}
          onClick={() => {
            if (!variant) return;
            addItem({
              productId: product.id,
              productName: product.name,
              variantId: variant.variantId,
              variantName: variant.name,
              price,
              currency,
              quantity,
              image: variant.image ?? product.thumbnailUrl,
            });
          }}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          Add to cart
        </button>

        {summaryHtml ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">
              FREE SHIPPING WORLDWIDE <FontAwesomeIcon icon={faGun} className="text-orange-500" />FUCK YEAH
            </h2>
            <div
              className="text-sm leading-relaxed text-slate-300 [&>p]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>ul>li]:mb-1"
              dangerouslySetInnerHTML={{ __html: summaryHtml }}
            />
            {extraHtml ? (
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="self-start text-xs font-semibold uppercase tracking-[0.3em] text-white/70 underline-offset-4 transition hover:text-white"
              >
               <FontAwesomeIcon icon={faMousePointer} className="text-white/70 underline-offset-4 transition hover:text-white" /> Click here to View The boring stuff, the full specifications
              </button>
            ) : null}
          </div>
        ) : null}

        {product.tags && product.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {showDetailsModal && extraHtml ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Full specifications
              </h3>
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 transition hover:text-white"
                aria-label="Close specifications"
              >
                ×
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 text-sm leading-relaxed text-slate-300 [&>p]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>ul>li]:mb-1">
              <div dangerouslySetInnerHTML={{ __html: extraHtml }} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
