import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductConfigurator } from "@/components/product-configurator";
import { ProductCard } from "@/components/product-card";
import { getPrintfulProduct, listAllPrintfulProducts } from "@/lib/printful";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = Number.parseInt(resolvedParams.id, 10);
  if (!Number.isFinite(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getPrintfulProduct(productId);
  } catch (error) {
    console.error(error);
    notFound();
  }

  let similar: Awaited<ReturnType<typeof listAllPrintfulProducts>>["products"] = [];
  try {
    const response = await listAllPrintfulProducts();
    similar = response.products
      .filter((item) => item.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-10">
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="transition hover:text-white">
          Shop
        </Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <ProductConfigurator product={product} />

      {similar.length > 0 ? (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
                You might also like
              </p>
              <h2 className="text-2xl font-semibold text-white">Related products</h2>
            </div>
            <Link href="/shop" className="text-sm font-medium text-white/70 transition hover:text-white">
              View all
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
