import type { Metadata } from "next";
import Link from "next/link";
import { FanzineArticleShell } from "@/components/fanzine-article-shell";

export const metadata: Metadata = {
  title: "The Dad Who Still Doesn't Give a F*ck | Vispea Fanzine",
  description:
    "Being the accomplished rebel means raising a family without killing the culture that raised you. Here's the uniform for that level of honesty.",
};

export default function AccomplishedRebelDadPage() {
  return (
    <FanzineArticleShell
      heroTag="Spread 002"
      heroBadge="Pillar Series"
      title="The Dad Who Still Doesn't Give a F*ck"
      dek="You built the life, kept the edge, and refused the khaki witness protection program. This is your dress code."
      imagePlaceholder="Xerox portrait of a dad in black tee leaning on a vintage car"
    >
      <section className="space-y-4">
        <h2 className="font-[var(--font-fanzine-punch)] text-3xl text-slate-900">Cool grew up—but didn&apos;t sell out.</h2>
        <p>
          You remember when cool meant leather jackets and not caring who was offended. Then you built businesses, families, mortgage-sized
          responsibilities—and everyone expected you to swap rebellion for respectability. You never signed that contract.
        </p>
        <p>
          This spread is for the ones who made it without erasing themselves. The ones who still show up in black, still blast the old
          playlists, still recognize graffiti as scripture.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">The Trap of Respectability</h3>
        <p>
          Success has a uniform. It&apos;s beige, logo-free, and designed to make you disappear. The world calls it maturity; we call it a
          trap. You were told you can have rebellion or stability—but not both. Most people believed it and let their closets erase their
          stories.
        </p>
        <p>
          You didn&apos;t. You understood that caring about how you dress isn&apos;t vanity—it&apos;s evidence that you remember who built this life in
          the first place.
        </p>
      </section>

      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-black/20" />
        <div className="relative flex min-h-[200px] items-center justify-center border-4 border-black bg-white px-6 text-center shadow-[8px_8px_0_#000]">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">IMAGE PLACEHOLDER — torn-paper collage of a dad at family dinner wearing a graffiti tee</span>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Real Rebellion at 40, 50, 60</h3>
        <p>
          Teenage rebellion is easy—you only risk your parents&apos; patience. Adult rebellion is refusing the system&apos;s pressure to become a
          corporate NPC. Staying yourself after you&apos;ve built a legacy is the highest difficulty setting, and the black tee is your badge.
        </p>
        <p>
          When you walk into a boardroom or a backyard cookout in something that still nods to punk flyers and spray caps, you&apos;re telling
          everyone success doesn&apos;t require self-erasure.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">What Your Clothes Say Without Words</h3>
        <p>
          Your kids read your outfit faster than any speech. They&apos;re learning whether adulthood is a costume change or another stage of
          authenticity. Your partner remembers why they chose you. Your peers—who quietly surrendered to the uniform—notice that you still
          stand out on purpose.
        </p>
        <p>
          A graffiti-charged tee communicates legacy, not midlife crisis. It says you held onto the culture that made you, even while you
          were building everything else.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">Gifting the Accomplished Rebel</h3>
        <p>
          Generic “dad gifts” are silent apologies for not paying attention. A shirt pulled from real walls, real songs, real stories says
          “I know you never traded edge for comfort.” It lands harder than expensive nothingness ever could.
        </p>
        <p>
          Whether you&apos;re buying for yourself or for the guy who taught you what rebellion looks like in a suit, pick something that still
          smells like spray paint and vinyl static.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-[var(--font-fanzine-punch)] text-2xl">The Uniform of the Accomplished Rebel</h3>
        <p>
          The black tee isn&apos;t teenage angst anymore. It&apos;s honesty. It&apos;s proof that you can raise kids, run companies, sign paychecks, and
          still respect the walls that raised you. Every Vispea design is tied to a story—an alley show, a burner, a cassette session—so
          you&apos;re never just wearing ink. You&apos;re wearing evidence.
        </p>
      </section>

      <section className="border-4 border-black bg-white px-6 py-8 text-center shadow-[10px_10px_0_#000]">
        <p className="text-xs uppercase tracking-[0.6em] text-slate-500">Call to Action</p>
        <h4 className="mt-2 font-[var(--font-fanzine-punch)] text-2xl text-slate-900">Dress like the system didn&apos;t win.</h4>
        <p className="mt-3 text-sm text-slate-700">
          These shirts were built for the guys who stayed real. Built for you. Grab one for yourself or the rebel who raised you.
        </p>
        <Link
          href="/shop"
          className="mt-5 inline-flex items-center gap-2 border-4 border-black bg-yellow-300 px-6 py-3 text-xs font-black uppercase tracking-[0.4em] text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:-translate-x-1"
        >
          Shop the drop
          <span aria-hidden>→</span>
        </Link>
      </section>
    </FanzineArticleShell>
  );
}
