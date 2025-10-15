"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LightRays from "@/components/LightRays";

const videoSrc = process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_URL;
const posterSrc = process.env.NEXT_PUBLIC_CLOUDINARY_HERO_POSTER_URL;
const MOBILE_BREAKPOINT = 768;

export function HeroVideo() {
  const [headerOffset, setHeaderOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    setIsMobile(query.matches);
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", handleChange);
      return () => {
        query.removeEventListener("change", handleChange);
      };
    }
    query.addListener(handleChange);
    return () => {
      query.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isMobile) {
      setHeaderOffset(0);
      return;
    }
    const header = document.querySelector<HTMLElement>("header");
    if (!header) {
      setHeaderOffset(0);
      return;
    }
    const updateOffset = () => {
      setHeaderOffset(header.getBoundingClientRect().height);
    };
    updateOffset();
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateOffset);
      resizeObserver.observe(header);
    } else {
      window.addEventListener("resize", updateOffset);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", updateOffset);
      }
    };
  }, [isMobile]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc ?? undefined}
        />
      ) : (
        <div className="absolute inset-0 h-full w-full bg-slate-900" />
      )}
      <div className="absolute inset-0 z-10 bg-black/80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{ top: isMobile ? headerOffset : 0 }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#008fff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={isMobile ? 1.6 : 1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      <div className="relative z-30 flex h-full flex-col items-start justify-center gap-6 px-8 py-48 sm:px-16 lg:px-24">
        <p className="text-sm font-medium uppercase tracking-[0.4em] text-white/70">
          Vispea Studio
        </p>
        
        <h1 className="max-w-3xl text-xl font-semibold leading-tight text-slate-200 sm:text-4xl lg:text-6xl">
          TOO . SMOOTH . TO . CARE .
        </h1>
        <p className="max-w-xl text-base text-slate-200 sm:text-lg">
          Psalm 69: Life is better when you have no Fucks to give.</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#catalogue"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/80"
          >
            DON’T CLICK HERE
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View cart
          </Link>
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-300">FREE SHIPPING WORLDWIDE <FontAwesomeIcon icon={faGun} className="text-orange-500" />FUCK YEAH
        </h2>
      </div>
    </section>
  );
}
