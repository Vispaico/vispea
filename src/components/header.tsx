"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { calculateCartTotals, useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const items = useCartStore((state) => state.items);
  const pathname = usePathname();
  const { totalQuantity, totalAmount, currency } = useMemo(() => calculateCartTotals(items), [items]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(totalAmount);

  return (
    <header className="">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/Logo Vispea footer fade yellow.webp" alt="Vispea" width={170} height={60} priority />
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-lg font-medium text-slate-200 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
              <Link
                key={link.href}
                href={link.href}
                  className={`transition hover:text-white/80 ${isActive ? "text-white" : ""}`}
              >
                {link.label}
              </Link>
              );
            })}
          </nav>

          <Link
            href="/checkout"
            className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
          >
            <span>Cart</span>
            <span className="inline-flex min-w-6 justify-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
              {totalQuantity}
            </span>
            <span className="hidden text-xs text-slate-400 sm:inline">
              {formattedTotal}
            </span>
          </Link>

          <button
            type="button"
            className="flex items-center rounded-full border border-slate-700 p-2 text-slate-200 transition hover:border-slate-500 hover:text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-900 bg-slate-950/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
              <Link
                key={link.href}
                href={link.href}
                  className={`rounded-xl border border-slate-900 px-4 py-2 transition hover:border-slate-700 hover:text-white ${isActive ? "border-slate-700 text-white" : ""}`}
              >
                {link.label}
              </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
