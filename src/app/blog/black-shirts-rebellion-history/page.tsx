import type { Metadata } from "next";
import Link from "next/link";
import { FanzineArticleShell } from "@/components/fanzine-article-shell";

export const metadata: Metadata = {
  title: "Why Real Men Wear Black Shirts | Vispea Fanzine",
  description:
    "Black tees aren't fashion. They're the code linking graffiti crews, punk kids, and hip-hop architects across decades of rebellion.",
};

export default function BlackShirtsHistoryPage() {
  return (
    <FanzineArticleShell
      heroTag="Spread 001"
      heroBadge="Pillar Series"
      title="Why Real Men Wear Black Shirts"
      dek="Fifty years of walls, amps, and alleyway broadcasts distilled into the only uniform that still tells the truth."
      imagePlaceholder="Photocopy collage of punk crowd + subway wall"
    >
      <section className="space-y-4">
        <h2 className="font-[var(--font-fanzine-punch)] text-3xl text-slate-900">Black is the code.</h2>
        <p>
          Black is honest. Black doesn&apos;t apologize. Black doesn&apos;t ask permission. It&apos;s been the uniform of rebels,
          artists, and people who refused to play the game for over fifty years—leather jackets in the 50s, subway tunnels in
          the 80s, roadside merch tables in the 90s. It isn&apos;t a trend. It&apos;s a language.
        </p>
        <p>
          If you&apos;re reading this, you already speak it. You&apos;ve watched trends come and go, yet you&apos;re still in black because the
          question was never “why wear it?” but “why does it still matter?” The answer is in the walls.
        </p>
      </section>

      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-black/20" />
        <div className="relative flex min-h-[200px] items-center justify-center border-4 border-black bg-white px-6 text-center shadow-[8px_8px_0_#000]">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">IMAGE PLACEHOLDER — high-contrast photocopy of punk crowd pressed against a subway car</span>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl text-slate-900">The Origins: When Black Meant Defiance</h3>
        <p>
          Post-war Europe birthed the first wave: leather-jacketed riders who treated black like a dare. Punk weaponized that
          aesthetic. Shirts ripped, safety-pinned, and scrawled on in permanent marker told the suburbs that conformity no longer
          scared anyone. Black meant you refused the sanitized version of adulthood.
        </p>
        <p>
          By the time the Sex Pistols and the Clash were spitting through cheap PA systems, the black shirt was the only uniform the
          establishment couldn&apos;t buy. It was a billboard for refusal. “I&apos;m not buying what you&apos;re selling” looked best in black.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl text-slate-900">The Walls Speak: Graffiti Culture and the Black Canvas</h3>
        <p>
          When punk&apos;s feedback faded, the subway tunnels took over. Graffiti writers from the Bronx to Berlin claimed space with
          paint and nerve, turning blank concrete into declarations. They dressed in black to move unseen, to disappear between the
          shadows and reappear on the wall, louder than any sanctioned billboard.
        </p>
        <p>
          Graffiti wasn&apos;t fashion. It was ownership. A tag said, “This wall is mine tonight,” and the black shirt was the stealth
          tech that made it possible. Every modern graffiti-heavy graphic tee owes its life to those midnight missions.
        </p>
      </section>

      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-black/20" />
        <div className="relative flex min-h-[200px] items-center justify-center border-4 border-black bg-white px-6 text-center shadow-[8px_8px_0_#000]">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">IMAGE PLACEHOLDER — grainy night shot of graffiti writer in black hoodie scaling a wall</span>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl text-slate-900">Hip-Hop Made it Portable</h3>
        <p>
          The 90s hip-hop explosion turned black tees into a global carrier signal. Oversized silhouettes became rolling canvases for
          mural-level art. You could print a wildstyle burner on cotton and teleport the Bronx to Tokyo overnight. Authenticity was
          suddenly wearable, and the uniform stayed unapologetically black.
        </p>
        <p>
          Hip-hop understood that black absorbs everything: crews, crews, and codes. It&apos;s a blank slate that still whispers the
          origin story to anyone paying attention.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl text-slate-900">The Unspoken Code</h3>
        <p>
          Fast forward to now. You built something real—family, business, legacy—and refused to erase the kid who loved walls and
          amps. Black isn&apos;t about shock anymore; it&apos;s about memory. It signals that success didn&apos;t bleach you. That you still speak
          the language of refusal, even if you choose your battles.
        </p>
        <p>
          Every time you pull on a black tee, you&apos;re telling the world you made it without selling out. That&apos;s rarer than loud
          rebellion ever was.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl text-slate-900">Why It Still Matters</h3>
        <p>
          In an era of algorithm-approved outfits, a black shirt still carries more history than any thousand-dollar runway drop.
          It&apos;s the portable museum of punk flyers, subway burners, and DIY hip-hop merch tables. You&apos;re wearing proof that rebellion
          doesn&apos;t get old—it gets refined.
        </p>
        <p>
          The walls that birthed today&apos;s designs were painted by people who risked something. When you wear their stories, you keep
          them alive. That&apos;s the real flex.
        </p>
      </section>

      <section className="border-4 border-black bg-white px-6 py-8 text-center shadow-[10px_10px_0_#000]">
        <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Call to Action</p>
        <h4 className="mt-2 font-[var(--font-fanzine-punch)] text-2xl text-slate-900">Wear the wall.</h4>
        <p className="mt-3 text-sm text-slate-700">
          Our designs started as midnight burners and basement gigs. When you wear Vispea, you&apos;re carrying the graffiti that refused
          to fade.
        </p>
        <Link
          href="/shop"
          className="mt-5 inline-flex items-center gap-2 border-4 border-black bg-yellow-300 px-6 py-3 text-xs font-black uppercase tracking-[0.4em] text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:-translate-x-1"
        >
          Browse the collection
          <span aria-hidden>→</span>
        </Link>
      </section>
    </FanzineArticleShell>
  );
}
