import Image from "next/image";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us | Vispea",
  description: "The story behind Vispea – underground grit, graffiti roots, and shirts built for the ones who never softened up.",
  alternates: {
    canonical: "/about",
  },
};

const heroImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_001_wfhren.webp";
const bandImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164988/Vispea/images/Girl_main_cover_bo_anner_fdxasm.webp";
const graffitiImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_003_f7onmu.webp";
const closingImage = "https://res.cloudinary.com/kinhcode01/image/upload/v1759164989/Vispea/images/Vispea_about_002_mj90ke.webp";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10">
      <header className="grid gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">About Vispea</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Who the Fuck We Are
        </h1>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative order-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 lg:order-1">
          <Image
            src={heroImage}
            alt="Vispea graffiti photography with bold neon lighting"
            width={300}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <h2 className="text-3xl font-semibold text-white">The Band That Became a T-Shirt Company (Or Was It the Other Way Around?)</h2>
          <p className="text-2xl text-slate-300">
          Vispea started in a Prague basement in 2019 when three friends decided that making music about street art made more sense than actually making street art.<br/>Why risk arrest when you can risk your entire music career instead?<br/><br/>
          Our process is simple: we find walls that speak louder than we ever could, take a photo, write a song about it, then slap it on a black t-shirt.<br/><br/>Some bands tour. We walk around cities with cameras and notebooks, looking suspicious.
          </p>
          <p className="text-2xl text-slate-300">
          The name &quot;Vispea&quot; comes from a drunken argument about Finnish mythology that nobody remembers correctly.<br/><br/>We&apos;re pretty sure it doesn&apos;t mean anything, which makes it perfect.
          </p>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <h2 className="text-3xl font-semibold text-white">The Music</h2>
          <p className="text-2xl text-slate-300">
            Our sound is what happens when punk rock gets tired of being angry and decides to be weird instead. We&apos;ve been described as &quot;aggressively confusing,&quot; &quot;surprisingly catchy for something this stupid,&quot; and &quot;please stop sending us your demos.&quot;
          </p>
          <p className="text-2xl text-slate-300">
            Every shirt design has a song. Every song tells a story. Most stories don&apos;t make sense, but neither does trying to spank Superboy or believing you&apos;re free while standing in a cage. We write about Kurosawa, laughing grannies, daddy issues painted on walls, and philosophical mailboxes. Because why not?
          </p>
        <div className="relative order-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 lg:order-1">
          <Image
            src={bandImage}
            alt="Vispea band performing with graffiti backdrop"
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="text-3xl font-semibold text-white">The Shirts</h2>
        <p className="max-w-5xl text-2xl text-slate-300">
          Black fabric. Bold prints. Zero compromise. We only make what we&apos;d actually wear, which explains why we&apos;re not rich yet. That being said, we’re not here to play nice or stack your closet—$69, shipped free, done. Wear it ‘til it’s beat, like your old tapes from ‘93.
        </p>
        <p className="max-w-5xl text-2xl text-slate-300">
          Each design is a moment frozen in time—graffiti that might be painted over tomorrow, street art that says more than a thousand think pieces, walls that witnessed more than they should have. We capture it, immortalize it, and let you walk around wearing someone else&apos;s rebellion.
        </p>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Image
            src={closingImage}
            alt="Vispea manifesto typography artwork"
            width={2000}
            height={1125}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-semibold text-white">The Philosophy</h2>
        <p className="max-w-5xl text-2xl font-stretch-120% text-orange-400">
          Psalm 69: &quot;Life is better when you have no Fucks to give.&quot;
        </p>
        <p className="max-w-5xl text-2xl text-slate-300">
          We believe in art without permission, music without rules, and fashion without trying too hard. We believe that Lego without love is just ego, that you should listen to your inner child, and that sometimes the world just needs to shut the fuck up and be nice.
        </p>
        <p className="max-w-5xl text-2xl text-slate-300">
          We&apos;re not here to change the world. We&apos;re here to put weird shit on t-shirts and write songs about it. If that accidentally means something to you, cool. If not, also cool.
        </p>

        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Image
            src={graffitiImage}
            alt="Vispea street art mural close-up"
            width={2000}
            height={1125}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-semibold text-white">Where We&apos;re Going</h2>
        <p className="max-w-5xl text-2xl text-slate-300">
          Probably nowhere fast, but we&apos;re enjoying the ride. We&apos;ll keep making songs about walls, walls about songs, and shirts about both until someone stops us or we run out of black fabric.
        </p><br/>
        <h2 className="text-center text-4xl font-semibold text-orange-400">Too . Smooth . To . Care .</h2>
        <p className="text-center text-2xl text-slate-300">
          Welcome to Vispea. Wear the chaos.
        </p>
       
      </section>
    </div>
  );
}
