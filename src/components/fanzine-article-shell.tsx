import { Special_Elite, Rubik_Mono_One } from "next/font/google";
import type { ReactNode } from "react";

const ransom = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-fanzine-ransom",
});

const punch = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-fanzine-punch",
});

type FanzineArticleShellProps = {
  heroTag: string;
  heroBadge?: string;
  title: string;
  dek: string;
  imagePlaceholder?: string;
  children: ReactNode;
};

export function FanzineArticleShell({
  heroTag,
  heroBadge = "Vispea Exclusive",
  title,
  dek,
  imagePlaceholder,
  children,
}: FanzineArticleShellProps) {
  return (
    <div className={`${punch.variable} ${ransom.variable} bg-[#f5f1df] text-slate-900`}>
      <div className="relative isolate overflow-hidden border-b-4 border-black bg-[#121113] px-6 py-16 text-amber-100 sm:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-3 border-2 border-amber-200/70 bg-black px-4 py-1 text-[11px] font-black uppercase tracking-[0.5em]">
              {heroTag}
              <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-black">{heroBadge}</span>
            </span>
            <h1 className="font-[var(--font-fanzine-punch)] text-4xl leading-tight text-white drop-shadow-[4px_4px_0_#fb923c] sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base text-amber-100/90" style={{ fontFamily: "var(--font-fanzine-ransom)" }}>
              {dek}
            </p>
          </div>
          {imagePlaceholder ? (
            <div className="relative">
              <div className="absolute inset-0 translate-x-2 translate-y-2 border-4 border-white/20" />
              <div className="relative flex min-h-[220px] items-center justify-center border-4 border-black bg-white/90 px-6 text-center shadow-[10px_10px_0_#000]">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-600" style={{ fontFamily: "var(--font-fanzine-ransom)" }}>
                  {imagePlaceholder}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute -left-4 top-6 hidden rotate-[-6deg] border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[6px_6px_0_#000] lg:block">
          hand-trimmed edges
        </div>
        <div className="pointer-events-none absolute -right-5 bottom-8 hidden rotate-[5deg] border-2 border-black bg-lime-200 px-4 py-2 text-xs font-black text-black shadow-[6px_6px_0_#000] lg:block">
          xerox royalty
        </div>
      </div>

      <article className="mx-auto w-full max-w-5xl space-y-12 px-6 py-16 sm:px-10" style={{ fontFamily: "var(--font-fanzine-ransom)" }}>
        {children}
      </article>
    </div>
  );
}
