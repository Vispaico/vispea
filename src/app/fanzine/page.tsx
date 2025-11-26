import type { Metadata } from "next";
import Link from "next/link";
import { Special_Elite, Rubik_Mono_One } from "next/font/google";
import styles from "./fanzine.module.css";

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

const articles = [
  {
    id: "black-shirts-history",
    title: "Why Real Men Wear Black Shirts",
    metaTitle: "Why Real Men Wear Black Shirts | Vispea Fanzine",
    slug: "/blog/black-shirts-rebellion-history",
    kicker: "History Spread",
    date: "Nov 26, 2025",
    excerpt:
      "Black is honest. From punk basements to subway tunnels, this spread traces how the black tee became the uniform for every rebel who refused to disappear.",
    metaDescription:
      "Black tees aren't fashion. They're the code linking graffiti crews, punk kids, and hip-hop architects across decades of rebellion.",
    palette: "from-yellow-300/80 via-amber-200/70 to-red-400/50",
    badge: "Pillar Post 001",
    placeholder: "Photocopy collage of punk crowd + subway wall",
  },
  {
    id: "accomplished-rebel-dad",
    title: "The Dad Who Still Doesn't Give a F*ck",
    metaTitle: "The Dad Who Still Doesn't Give a F*ck | Vispea Fanzine",
    slug: "/blog/dad-accomplished-rebel-style",
    kicker: "Legacy Spread",
    date: "Nov 28, 2025",
    excerpt:
      "Success was supposed to sand you down. Instead you kept the leather, the music, the graffiti. This manifesto is for the dads who never traded authenticity for a mortgage.",
    metaDescription:
      "Being the accomplished rebel means raising a family without killing the culture that raised you. Here's the uniform for that level of honesty.",
    palette: "from-lime-200/80 via-emerald-200/60 to-cyan-400/50",
    badge: "Pillar Post 002",
    placeholder: "Xerox portrait of dad in black tee + vintage car",
  },
  {
    id: "graffiti-walls-to-wear",
    title: "Graffiti as Rebellion",
    metaTitle: "Graffiti as Rebellion: Walls to Wearable Art | Vispea",
    slug: "/blog/graffiti-walls-to-wearable-art",
    kicker: "Culture Spread",
    date: "Dec 02, 2025",
    excerpt:
      "From Philly tags to global moving galleries, we follow the moment walls became wardrobes without losing that illegal heartbeat.",
    metaDescription:
      "Graffiti is still the last art form that never asks permission. This drop explains how we translate those walls into shirts without sanitizing the story.",
    palette: "from-rose-200/80 via-fuchsia-200/50 to-indigo-400/50",
    badge: "Pillar Post 003",
    placeholder: "Photocopied subway car drenched in tags",
  },
];

const columns = [
  {
    title: "Manifesto",
    body: [
      "We print because the internet feels too clean.",
      "We yell in uppercase because whispers never started a pit.",
      "We sell shirts to fund the noise, not the other way around.",
    ],
  },
  {
    title: "Field Log",
    body: [
      "Basement humidity: 92%. Perfect for drying ink and bad decisions.",
      "Number of busted needles tonight: 4 (record).",
      "Merch table currency accepted: cash, trade zines, good stories.",
    ],
  },
  {
    title: "Up Next",
    body: [
      "Issue 008: international bootlegs.",
      "Issue 009: the Phuc Method sewing pattern.",
      "Issue 010: letters from the borderless pit.",
    ],
  },
];

const collageNotes = [
  "Spray mount is a food group.",
  "Fold, staple, riot, repeat.",
  "Print now, apologize later.",
  "No auto-tune allowed past this line.",
];

const mixtape = [
  "SIDE A — Brass Knuckle Lullaby",
  "SIDE B — Alleyway Echoes",
  "SIDE C — Photocopied Thunder",
  "SIDE D — Love Letter To Feedback",
];

const tourMarks = [
  { city: "Lisbon", detail: "rooftop broadcast • 30 radios hacked" },
  { city: "Antwerp", detail: "stencil marathon • 4am curfew dodge" },
  { city: "Detroit", detail: "warehouse baptism • shirts sold wet" },
];

export const metadata: Metadata = {
  title: "Fanzine",
  description: "The Vispea bootleg bulletin — scene reports, ink stains, and punk rock dispatches.",
};

export default function FanzinePage() {
  const rotations = ["rotate-[-2.5deg]", "rotate-[1.2deg]", "rotate-[-0.8deg]", "rotate-[2deg]"]; 

  return (
    <div
      className={`${punch.variable} ${ransom.variable} ${styles.page} relative isolate flex flex-1 flex-col overflow-hidden text-slate-900`}
    >
      <div className={`pointer-events-none absolute inset-0 opacity-80 ${styles.pageSpeckles}`} />

      <div className="relative z-10 flex flex-col">
        <section className="relative overflow-hidden border-b-4 border-black bg-[#121113] px-6 py-14 text-amber-100 sm:px-10">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_0.7fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 border-2 border-amber-200/60 bg-black px-4 py-1 text-[11px] font-black uppercase tracking-[0.5em]">
                Issue 001
                <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-black">DIY PRESS</span>
              </span>
              <h1 className="font-[var(--font-fanzine-punch)] text-4xl leading-tight text-white drop-shadow-[4px_4px_0_#fb923c] sm:text-5xl">
                VISPEA FANZINE
                <span className="block text-lg font-[var(--font-fanzine-ransom)] text-amber-200">
                  photocopied gospel for the too-smooth-to-care club
                </span>
              </h1>
              <p className={`max-w-2xl text-lg text-amber-100/90 ${styles.fontRansom}`}>
                Built like the zines we traded in parking lots: crooked, loud, and permanent-marker honest.
                This spread hosts every report, rant, and roadmap we&apos;re brave enough to print.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                {collageNotes.map((note) => (
                  <span
                    key={note}
                    className={`border-2 border-black bg-amber-200 px-3 py-1 text-black shadow-[4px_4px_0_#000] ${styles.fontRansom}`}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 translate-x-2 translate-y-2 border-4 border-white/20" />
              <div className={`relative flex h-full flex-col gap-4 border-4 border-black p-5 text-black ${styles.fieldTexture}`}>
                <p className={`text-sm uppercase tracking-[0.5em] ${styles.fontRansom}`}>
                  field paraphernalia
                </p>
                <div className={`flex flex-col gap-2 text-sm ${styles.fontRansom}`}>
                  <p>• camera batteries held alive with tape</p>
                  <p>• stack of blank newsprint and hope</p>
                  <p>• marker that smells like 1998</p>
                </div>
                <div className="mt-auto flex items-center gap-6 text-xs uppercase tracking-[0.3em]">
                  <span>PRINT TEMPO 180 BPM</span>
                  <span>SKATE FAST • STAPLE HARD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-3 top-8 hidden rotate-[-6deg] border-2 border-black bg-white px-4 py-2 text-black shadow-[6px_6px_0_#000] sm:block">
            hand-trimmed edges
          </div>
          <div className="pointer-events-none absolute -right-5 bottom-6 hidden rotate-[4deg] border-2 border-black bg-lime-200 px-4 py-2 text-black shadow-[6px_6px_0_#000] sm:block">
            xerox royalty
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <div className="mb-12 flex flex-col gap-3">
            <p className={`text-xs uppercase tracking-[0.6em] text-slate-500 ${styles.fontRansom}`}>
              fresh ink
            </p>
            <h2 className="font-[var(--font-fanzine-punch)] text-3xl text-slate-900 sm:text-4xl">
              Spread wall / touch nothing, read everything
            </h2>
            <p className={`max-w-2xl text-base ${styles.fontRansom}`}>
              Every card is a future article layout. We rotate them like flyers on a venue pole so you can feel the noise
              before reading it.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="grid gap-8 md:grid-cols-2">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className={`group relative border-4 border-black bg-white p-6 shadow-[10px_10px_0_#0f172a] ${rotations[index % rotations.length]}`}
                >
                  <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${article.palette}`} />
                  <div className={`flex items-center justify-between text-[10px] uppercase tracking-[0.5em] ${styles.fontRansom}`}>
                    <span>{article.kicker}</span>
                    <span className="rounded-full border border-black px-2 py-0.5 text-[9px] font-semibold">
                      {article.badge}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="relative flex min-h-[140px] items-center justify-center border-2 border-dashed border-black/60 bg-slate-100 text-center">
                      <span className={`px-4 text-xs font-black uppercase tracking-[0.5em] text-slate-500 ${styles.fontRansom}`}>
                        {article.placeholder}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{article.metaTitle}</p>
                      <h3 className="mt-1 font-[var(--font-fanzine-punch)] text-2xl text-slate-900">
                        {article.title}
                      </h3>
                    </div>
                    <p className={`text-sm text-slate-700 ${styles.fontRansom}`}>
                      {article.excerpt}
                    </p>
                    <p className={`text-xs text-slate-500 ${styles.fontRansom}`}>
                      {article.metaDescription}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className={styles.fontRansom}>{article.date}</span>
                    <span className="font-[var(--font-fanzine-ransom)]">#{article.id.replace(/-/g, "").slice(0, 6)}</span>
                  </div>
                  <Link
                    href={article.slug}
                    prefetch={false}
                    className={`mt-6 inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 text-xs font-black uppercase text-black shadow-[4px_4px_0_#000] transition group-hover:-translate-y-1 group-hover:-translate-x-1 ${styles.fontRansom}`}
                  >
                    Read the spread
                    <span aria-hidden>➜</span>
                  </Link>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              {columns.map((column, index) => (
                <div
                  key={column.title}
                  className="relative border-2 border-dashed border-black bg-[#fffdf4] p-5 shadow-[8px_8px_0_#000]"
                >
                  <span className="absolute -top-4 left-6 bg-black px-4 py-1 text-xs font-black uppercase tracking-[0.5em] text-white">
                    {column.title}
                  </span>
                  <div className={`mt-4 space-y-3 text-sm ${styles.fontRansom}`}>
                    {column.body.map((line) => (
                      <p key={line} className="border-l-2 border-black/40 pl-3">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute -right-3 top-3 rotate-6 border-2 border-black bg-lime-200 px-3 py-1 text-[10px] font-semibold text-black">
                    stack {index + 1}
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="relative border-y-4 border-black bg-[#0f172a] px-6 py-14 text-lime-200 sm:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
            <div className="flex-1 space-y-4">
              <p className={`text-xs uppercase tracking-[0.6em] text-lime-400/70 ${styles.fontRansom}`}>
                pirate mixtape
              </p>
              <h3 className="font-[var(--font-fanzine-punch)] text-3xl text-white">Cassette 002 — “Velvet Feedback”</h3>
              <div className={`space-y-2 text-sm ${styles.fontRansom}`}>
                {mixtape.map((entry) => (
                  <p key={entry} className="flex items-center gap-3">
                    <span className="inline-block h-2 w-2 bg-lime-300" />
                    {entry}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-5">
              <p className={`text-xs uppercase tracking-[0.6em] text-lime-400/70 ${styles.fontRansom}`}>
                shadow tour marks
              </p>
              <div className="space-y-4">
                {tourMarks.map((stop, index) => (
                  <div key={stop.city} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center border-2 border-lime-300 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-[var(--font-fanzine-punch)] text-xl text-white">{stop.city}</p>
                      <p className={`text-sm text-lime-100 ${styles.fontRansom}`}>
                        {stop.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`pointer-events-none absolute inset-0 ${styles.starOverlay}`} />
        </section>

        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
          <div className="relative border-4 border-black bg-white px-6 py-10 text-center shadow-[12px_12px_0_#000]">
            <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 rotate-[-3deg] border-2 border-black bg-pink-200 px-5 py-2 text-xs font-black uppercase text-black">
              contribute a spread
            </div>
            <h3 className="font-[var(--font-fanzine-punch)] text-3xl text-slate-900">Your scans, our chaos.</h3>
            <p className={`mx-auto mt-4 max-w-3xl text-base ${styles.fontRansom}`}>
              Send us torn posters, gig scribbles, backstage gossip, diagrams of impossible rigs. We&apos;ll collage it, ink it,
              and shout your name in the liner notes.
            </p>
            <Link
              href="mailto:riot@vispea.com"
              className={`mt-6 inline-flex items-center gap-3 border-4 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:-translate-x-1 ${styles.fontRansom}`}
            >
              email riot@vispea.com
              <span aria-hidden>✽</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
