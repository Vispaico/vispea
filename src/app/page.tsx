import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { ProductCard } from "@/components/product-card";
import { listAllPrintfulProducts } from "@/lib/printful";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof listAllPrintfulProducts>>["products"] = [];
  let error: string | null = null;

  try {
    const response = await listAllPrintfulProducts();
    products = response.products;
  } catch (caught) {
    console.error(caught);
    error = "Unable to load products. Verify your Printful credential configuration.";
  }

  return (
    <div className="flex flex-col">
      <div className="relative left-1/2 mt-[-80px] w-screen -translate-x-1/2">
        <HeroVideo />
      </div>

      <section id="catalogue" className="flex flex-col gap-12 px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-6">
          <span className="text-sm text-center font-medium uppercase tracking-[0.3em] text-slate-400">
            Featured Bangers
          </span>
          <h2 className="text-3xl text-center font-semibold tracking-tight text-white sm:text-4xl">
            Wear these and you are as smooth as Phuc
          </h2>
          <p className="text-xl text-center text-slate-300">
            Zero compromise. One type of shirt, black only because colors are for people who need attention.<br/>You already got enough personality. These aren&apos;t fashion statements, they&apos;re conversation enders.<br/><strong className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">Grab one before we get bored and move on to the next thing</strong>
          </p>
        </div>

        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-slate-400">
            No products available yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .slice()
              .sort((a, b) => {
                const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
                const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
                if (aOrder === bOrder) {
                  return a.name.localeCompare(b.name);
                }
                return aOrder - bOrder;
              })
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-white/80"
          >
            SEE ALL BANGERS HERE
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-10 sm:px-10">
        <div className="pt-8 grid gap-8 sm:grid-cols-3">
          {[{
            image: "/globe-free-img.webp",
            title: "FREE Shipping Worldwide",
            subtitle: "FUCK YEAH",
          }, {
            image: "/quality-free-img.webp",
            title: "Banger Quality",
            subtitle: "Handpicked by kids in Bangladesh",
          }, {
            image: "/tag-free-img.webp",
            title: "Banger Offers",
            subtitle: "So good that we don’t do discounts",
          }].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-6 text-center">
              <Image src={item.image} alt={item.title} width={96} height={96} className="h-24 w-24" />
              <div>
                <p className="text-m font-semibold uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">{item.title}</p>
                <p className="text-m bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-200">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
