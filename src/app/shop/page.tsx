import { ProductCard } from "@/components/product-card";
import { StorePagination } from "@/components/store-pagination";
import { listAllPrintfulProducts } from "@/lib/printful";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const PAGE_SIZE = 15;

export default async function ShopPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPageParam = Array.isArray(resolvedParams?.page)
    ? resolvedParams?.page[0]
    : resolvedParams?.page;
  const currentPage = Math.max(1, Number.parseInt(currentPageParam ?? "1", 10) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  let products: Awaited<ReturnType<typeof listAllPrintfulProducts>>["products"] = [];
  let error: string | null = null;

  try {
    const response = await listAllPrintfulProducts();
    products = response.products;
  } catch (caught) {
    console.error(caught);
    error = "Unable to load products.";
  }
  const sortedProducts = products
    .slice()
    .sort((a, b) => {
      const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      if (aOrder === bOrder) {
        return a.name.localeCompare(b.name);
      }
      return aOrder - bOrder;
    });

  const totalPages = sortedProducts.length > 0 ? Math.ceil(sortedProducts.length / PAGE_SIZE) : currentPage;
  const pageItems = sortedProducts.slice(offset, offset + PAGE_SIZE);

  return (
    <div className="mx-auto flex flex-col gap-12 px-6 py-16 sm:px-10">
      <header className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
          Vispea Shop
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Browse the full banger collection
        </h1>
        <p className="max-w-2xl text-base text-slate-300">
          Easy Peazy Lemon Squeezy. No hassle, no drama, just smooth sailing.<br/>And never forget these words of wisdom: <br/><strong className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">FREE SHIPPING WORLDWIDE - FUCK YEAH</strong>
        </p>
      </header>

      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : sortedProducts.length === 0 ? (
        <p className="text-sm text-slate-400">No products found.</p>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <StorePagination currentPage={currentPage} totalPages={totalPages} basePath="/shop" />
        </div>
      )}
    </div>
  );
}
