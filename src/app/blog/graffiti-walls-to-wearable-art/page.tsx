import type { Metadata } from "next";
import Link from "next/link";
import { FanzineArticleShell } from "@/components/fanzine-article-shell";

export const metadata: Metadata = {
  title: "Graffiti as Rebellion: Walls to Wearable Art | Vispea",
  description:
    "Graffiti is still the last art form that never asks permission. Here's how we translate those walls into shirts without sanitizing the story.",
};

export default function GraffitiRebellionPage() {
  return (
    <FanzineArticleShell
      heroTag="Spread 003"
      heroBadge="Pillar Series"
      title="Graffiti as Rebellion: From Walls to Wearable Art"
      dek="From Philly tags to global wardrobes, this is how the last lawless art form keeps breathing through cloth."
      imagePlaceholder="Photocopied subway car drenched in tags"
    >
      <section className="space-y-4">
        <h2 className="font-[var(--font-fanzine-punch)] text-3xl text-slate-900">The wall is a question. The writer answers.</h2>
        <p>
          Every graffiti story begins with a choice: walk away or risk everything for a few square feet of concrete. Cops, records, court
          dates on one side. Freedom on the other. The ones who pick the wall keep the rest of us honest.
        </p>
        <p>
          This spread is a salute to those decisions—and how we turned them into wearable artifacts without asking permission either.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">History: When Streets Became Galleries</h3>
        <p>
          Philly taggers in the 60s weren&apos;t trying to make art—they were trying to exist. New York writers in the 70s weaponized the
          subway system, turning rolling stock into curated chaos. The city tried to scrub it all away, proving the rebellion wasn&apos;t in
          the paint but in the refusal to ask permission.
        </p>
        <p>
          That ethos still drips from every fill-in, every burner, every clean typo on a bridge.
        </p>
      </section>

      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-black/20" />
        <div className="relative flex min-h-[200px] items-center justify-center border-4 border-black bg-white px-6 text-center shadow-[8px_8px_0_#000]">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">IMAGE PLACEHOLDER — skate deck, spray cans, and boombox staged on concrete floor</span>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Culture: The Code that Money Can&apos;t Buy</h3>
        <p>
          By the 80s, graffiti was a complete ecosystem with crews, hierarchies, beefs, and codes of honor. You couldn&apos;t buy your way in;
          you had to bleed for it. Skill and nerve were currency. Authenticity was the only passport.
        </p>
        <p>
          That&apos;s why graffiti still feels dangerous even when it hits a gallery wall. The art is gorgeous, but the context—the risk—is
          what makes it holy.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Translation: When Walls Started Walking</h3>
        <p>
          Eventually those walls leapt onto shirts, prints, and canvases. Commercial success saved some of the legends, but it also
          threatened to declaw the movement. We refuse to let that happen. Each Vispea design traces directly back to a wall, a night, a
          song, a conversation.
        </p>
        <p>
          Wearable graffiti only matters if you remember the alley it came from. Otherwise it&apos;s just clip art.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Why These Designs Matter</h3>
        <p>
          Each drop we release is tied to a wall and a track. You aren&apos;t just buying graphics—you&apos;re carrying part of a conversation
          that started with a hissed spray can and ended with a hook that stuck in your head on the drive home.
        </p>
        <p>
          When you wear one of these tees, you&apos;re saying “I know where this came from, and I&apos;m not letting the story get rewritten by the
          sanitized version.”
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Soundtrack Required</h3>
        <p>
          Every piece in this collection has a partner song because graffiti has always talked to music. Subway rumble to boom bap. Spray
          hiss to bass drops. We package both halves so you&apos;re not just looking at rebellion—you&apos;re listening to it.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">What We&apos;re Really Saying</h3>
        <p>
          Graffiti proves you don&apos;t need permission to exist loudly. That truth is still uncomfortable, still necessary, still worth
          wearing. The medium changed; the mission didn&apos;t.
        </p>
      </section>

      <section className="border-4 border-black bg-white px-6 py-8 text-center shadow-[10px_10px_0_#000]">
        <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Call to Action</p>
        <h4 className="mt-2 font-[var(--font-fanzine-punch)] text-2xl text-slate-900">Carry the wall with you.</h4>
        <p className="mt-3 text-sm text-slate-700">
          Explore the designs born from real burners, real crews, and real songs. Wear them like a portable alleyway sermon.
        </p>
        <Link
          href="/shop"
          className="mt-5 inline-flex items-center gap-2 border-4 border-black bg-yellow-300 px-6 py-3 text-xs font-black uppercase tracking-[0.4em] text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:-translate-x-1"
        >
          Discover the designs
          <span aria-hidden>→</span>
        </Link>
      </section>
    </FanzineArticleShell>
  );
}
