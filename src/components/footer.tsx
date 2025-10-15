import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Music2, Twitter, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import AudioPlayer from "@/components/AudioPlayer";

const socialLinks = [
  { href: "https://facebook.com/vispea1", label: "Facebook", icon: Facebook },
  { href: "https://youtube.com/@vispea", label: "YouTube", icon: Youtube },
  { href: "https://x.com/Vispea_", label: "X", icon: Twitter },
  { href: "https://instagram.com/vispea_/", label: "Instagram", icon: Instagram },
  { href: "https://tiktok.com/@vispea_", label: "TikTok", icon: Music2 },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Sample tracks for the player (replace with your Cloudinary URLs)
  const tracks = [
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292552/Vispea/Sounds/Bleach_a_Nun_s_Bum_lh0x1u.mp3",
      title: "Bleach a Nun's Bum",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211320/Vispea/images/nun_orange_rlbra5.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292566/Vispea/Sounds/Laughing_Granny_fzcfup.mp3",
      title: "Laughing Granny",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759212654/Vispea/images/Laughing_Granny_orange_ksk6xr.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292560/Vispea/Sounds/Happy_Happens_axpgsr.mp3",
      title: "Happy Happens",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/Hoxton_orange_ggaibe.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292558/Vispea/Sounds/Fuck_Wars_and_Drink_Absinth_ipqn8l.mp3",
      title: "Fuck Wars and Drink Absinth",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211306/Vispea/images/fuck_wars_orange_aaobm8.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292564/Vispea/Sounds/Kurosawa_tzqwgg.mp3",
      title: "Kurosawa",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759215274/Vispea/images/Kuro_orange_v8rxhj.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759739504/Vispea/Sounds/Daddy_I_Want_a_Fucking_Pony_ctrkbz.mp3",
      title: "Daddy i Want a Fucking Pony",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211326/Vispea/images/pony_orange_avgapo.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292584/Vispea/Sounds/You_Are_Free_vongp7.mp3",
      title: "You are free",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759222126/Vispea/images/you_are_free_orange_utpsvm.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292562/Vispea/Sounds/Just_Be_Nice_xjvx5j.mp3",
      title: "Just Be Nice",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759219517/Vispea/images/Just_be_nice_orange_ubqxbk.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292556/Vispea/Sounds/Fuck_I_Love_You_il0hyy.mp3",
      title: "Fuck I Love You",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759222108/Vispea/images/fuc_i_love_u_orange_sc6y5o.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292554/Vispea/Sounds/Disobey_tubia3.mp3",
      title: "Disobey",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211121/Vispea/images/disobey_orange_bw3gde.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292570/Vispea/Sounds/Listen_to_your_inner_child_rhzspw.mp3",
      title: "Listen to your inner child",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759219837/Vispea/images/inner_child_orange_rm6u9i.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292573/Vispea/Sounds/Mona_Lisa_meets_Pele%CC%81_mrdp4c.mp3",
      title: "Mona Lisa meets Pele",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759220106/Vispea/images/monalisa_pele_orange_izxbls.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292575/Vispea/Sounds/Rebel_wmo1bx.mp3",
      title: "Rebel",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/rebel_orange_ujdqo1.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292582/Vispea/Sounds/Withered_Heart_gtccun.mp3",
      title: "Withered Heart",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759222116/Vispea/images/Withered_heart_orange_bgrr7l.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292577/Vispea/Sounds/Try_To_Spank_Superboy_cgorzz.mp3",
      title: "Try To Spank Superboy",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759222721/Vispea/images/superboy_orange_ue6i5a.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292573/Vispea/Sounds/Never_Ever_on_a_First_Date_faytmf.mp3",
      title: "Never Ever On a First Date",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211313/Vispea/images/never_orange_brenlo.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1759292551/Vispea/Sounds/Be_The_Light_lnxfdm.mp3",
      title: "Be The Light",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1759211048/Vispea/images/be_light_orange_fnd0nc.jpg",
    },
    {
      src: "https://res.cloudinary.com/kinhcode01/video/upload/v1760514828/Vispea/Sounds/Daddy_s_Girl_z2t3gu.mp3",
      title: "Daddy's Girl",
      artist: "Vispea",
      cover: "https://res.cloudinary.com/kinhcode01/image/upload/v1760459128/Vispea/images/dads_grl_orange_ksbp2s.jpg",
    },
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-900 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-13">
        <Image
          src="/Vispea_Footer_BG_1.webp"
          alt="Vispea footer background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative border-b border-slate-900/80 bg-gradient-to-r from-slate-900 via-slate-950 to-black opacity-60 px-6 py-6 text-center text-sm font-medium text-slate-300 sm:text-base">
        “Style is knowing who you are, what you want to say, and not giving a damn.” — Gore Vidal
      </div>
      <div className="relative mx-auto grid w-full max-w-8xl gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1.5fr_1.3fr_1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">The Vispea Storybook</span>
            <p className="text-sm text-slate-400">Drop your email, get the underground dispatch. No spam, just street gospel.</p>
          </div>
          <NewsletterForm />
        </div>
        <nav className="flex flex-col gap-3 text-sm text-center text-slate-300">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">Vispea Sound Machine</span>
          <Link href="https://open.spotify.com/artist/7Mb7jeLMbEZMv5Ozye6kmm?si=yuOuRoH8RuucvzMjAZLPtQ" className="transition hover:text-white" target="_blank" rel="noreferrer">
            Vispea Spotify Page
          </Link>
        </nav>
        <nav className="flex flex-col gap-3 text-sm text-center text-slate-300">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">Links</span>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About Us
          </Link>
          <Link href="/account" className="transition hover:text-white">
            Account
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/refund-and-returns-policy" className="transition hover:text-white">
            Refund and Returns Policy
          </Link>
        </nav>
       <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">ADDRESS</span>
            <p className="text-sm text-slate-200">The Vispea Studio</p>
            <p className="text-sm text-slate-200">23/32 To 2 Xom Trung</p>
            <p className="text-sm text-slate-200">Phuong Dang Giang | Ngo Quyen</p>
            <p className="text-sm text-slate-200">Haiphong | Vietnam</p>
            <p className="text-sm text-slate-200">Email: gobbledygook@vispea.com</p><br/>
            <p className="text-sm text-slate-400">For Business Inquiries</p>
            <p className="text-sm text-slate-400">Phone: +84 (0) 822 992 665</p>
            <p className="text-sm text-slate-400">Email: studio@vispea.com</p>
          </div>
        </div>
      </div>
          <div className="relative px-6 py-4 text-center gap-3 flex justify-center">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition hover:border-white/60 hover:text-white"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <div className="relative pt-6 py-4 text-center gap-3 flex justify-center">
          <Link href="/" className="flex w-fit items-center gap-3">
            <Image src="/VISPEA_footer_WH.webp" alt="Vispea" width={160} height={40} />
          </Link>
          </div>
          <div className="relative px-6 py-4 text-center gap-3 flex justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-300">Too . Smooth . To . Care .</p>
          </div>
      <div className="relative border-t border-slate-900/80 px-6 py-4 text-center text-xs text-slate-300">
        Copyright © {currentYear} VISPEA | Powered by Amore & Coffee
      </div>
      <AudioPlayer initialTracks={tracks} />
    </footer>
  );
}