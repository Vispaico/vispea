import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vispea",
  description: "The story behind Vispea – East German grit, graffiti roots, and shirts built for the ones who never softened up.",
};

const heroImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_001_wfhren.webp";
const graffitiImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_003_f7onmu.webp";
const closingImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_002_mj90ke.webp";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10">
      <header className="grid gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">About Us</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Who the Fuck We Are
        </h1>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Image
            src={heroImage}
            alt="Vispea crew"
            width={2000}
            height={1125}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <p className="max-w-3xl text-base text-slate-300">
          We are from the GDR—East Germany, a place that vanished overnight. Watched my whole world get scratched out like a tag on a wall nobody wanted.
          Shit like that sticks—you learn fast that nothing lasts, that it can all end quick. After living 15 years in Spain, i found my heart home in Vietnam 7 years ago. So live today, no fucks given, ‘cause tomorrow’s a gamble I ain’t sweating.
          That’s VISPEA—one black shirt, one graffiti print, $69, free shipping worldwide. No fluff, no fake-ass trends—just a piece for the ones who get it, the ones who’ve always been too smooth to care.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative order-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 lg:order-1">
          <Image
            src={graffitiImage}
            alt="Graffiti roots"
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <h2 className="text-3xl font-semibold text-white">Why Graffiti Runs Our Veins</h2>
          <p className="text-base text-slate-300">
            Graffiti’s the pulse of the ‘90s underground—skate rats bombing rails, punks trashing dives, hip-hop crews spitting in alleys. It’s rebellion in a can, art that don’t ask permission.
          </p>
          <p className="text-base text-slate-300">
            Back when subculture meant something—when you’d rather tag a train than bow to the suits—graffiti was the middle finger to the machine. We love it ‘cause it’s raw, it’s real, it’s ours. Every VISPEA print’s a nod to that chaos, that grit, that “fuck you” to the norm.
          </p>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="text-3xl font-semibold text-white">What We’re About</h2>
        <p className="max-w-3xl text-base text-slate-300">
          One shirt. One vibe. No rules. Built for the skaters who never sold their decks, the punks who kept the spikes, the b-boys who still spin. We’re not here to play nice or stack your closet—$69, shipped free, done. Wear it ‘til it’s beat, like your old tapes from ‘93.
        </p>
        <p className="max-w-3xl text-base text-slate-300">
          Psalm 69 says it best: “Life’s better when you have no fucks to give.” Too . Smooth . To . Care . That’s VISPEA.
        </p>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Image
            src={closingImage}
            alt="Vispea manifesto"
            width={2000}
            height={1125}
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
