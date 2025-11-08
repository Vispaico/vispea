"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { PrintfulProduct } from "@/lib/validators";
import { useCartStore } from "@/store/cart";

type Props = {
  product: PrintfulProduct;
};

export function ProductCard({ product }: Props) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = product.variants.find((variant) => variant.id === variantId);

  const productAlt = selectedVariant
    ? `${product.name} – ${selectedVariant.name}`
    : `${product.name} product photo`;

  const price = selectedVariant ? Number.parseFloat(selectedVariant.retailPrice) : 0;
  const currency = selectedVariant?.currency ?? "USD";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 shadow-sm transition hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg">
      <Link href={`/shop/${product.id}`} className="group relative block">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-pink-600 to-orange-400 shadow-inner-md">
          {selectedVariant?.image ? (
            <Image
              src={selectedVariant.image}
              alt={productAlt}
              width={400}
              height={400}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-145"
            />
          ) : product.thumbnailUrl ? (
            <Image
              src={product.thumbnailUrl}
              alt={`${product.name} product photo`}
              width={400}
              height={400}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Preview unavailable
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <div>
          <Link href={`/shop/${product.id}`} className="text-lg font-semibold tracking-tight text-white transition hover:text-white/80">
            {product.name}
          </Link>
          <p className="text-sm text-slate-300">{formattedPrice}</p>
        </div>

        {product.variants.length > 1 ? (
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-slate-300">Choose a variant</span>
            <select
              value={variantId}
              onChange={(event) => setVariantId(Number.parseInt(event.target.value, 10))}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-slate-500 focus:outline-none"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} · {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: variant.currency,
                    minimumFractionDigits: 2,
                  }).format(Number.parseFloat(variant.retailPrice))}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button
          type="button"
          disabled={!selectedVariant}
          onClick={() => {
            if (!selectedVariant) return;
            addItem({
              productId: product.id,
              productName: product.name,
              variantId: selectedVariant.variantId,
              variantName: selectedVariant.name,
              price,
              currency,
              quantity: 1,
              image: selectedVariant.image ?? product.thumbnailUrl,
            });
          }}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-300"
        >
          Add to cart
        </button>
        <Link
          href={`/shop/${product.id}`}
          className="inline-flex items-center justify-center text-sm font-medium text-white/70 transition hover:text-white"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
