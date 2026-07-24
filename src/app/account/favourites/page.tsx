import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";

import { ProductCard } from "@/components/product-card";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { favourites } from "@/lib/db/schema";
import { listAllPrintfulProducts } from "@/lib/printful";

import { removeFavourite } from "./actions";

export const metadata: Metadata = {
  title: "Favourites | Vispea",
  alternates: { canonical: "/account/favourites" },
};

export default async function FavouritesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  const rows = await db
    .select({ productId: favourites.productId })
    .from(favourites)
    .where(eq(favourites.userId, session.user.id));

  const ids = new Set(rows.map((r) => r.productId));

  const { products } = await listAllPrintfulProducts();
  const favProducts = products.filter((p) => ids.has(p.id));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Favourites</h1>
          <p className="text-sm text-slate-300">Items you saved for later.</p>
        </div>
        <Link
          href="/account"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Back
        </Link>
      </header>

      {favProducts.length === 0 ? (
        <p className="text-sm text-slate-300">No favourites yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <form action={removeFavourite} className="absolute right-4 top-4">
                <input type="hidden" name="productId" value={product.id} />
                <button
                  type="submit"
                  className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/60"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
