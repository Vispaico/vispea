"use client";

import { useEffect, useRef, useState } from "react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const DISMISS_KEY = "vispea_exit_intent_dismissed";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const alreadyDismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    if (alreadyDismissed) {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (hasFiredRef.current) {
        return;
      }

      if (event.clientY <= 0) {
        hasFiredRef.current = true;
        setOpen(true);
      }
    };

    const handleVisibilityChange = () => {
      if (hasFiredRef.current || document.visibilityState !== "hidden") {
        return;
      }

      hasFiredRef.current = true;
      setOpen(true);
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const closeAndRemember = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "true");
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 sm:items-center"
      onClick={closeAndRemember}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="relative flex w-full max-w-lg flex-col gap-6 overflow-hidden border-4 border-black bg-[#fef3c7] p-6 text-slate-900 shadow-[12px_12px_0_#000] max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-4xl sm:gap-8 sm:p-10 sm:max-h-none sm:overflow-visible"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeAndRemember}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-lg font-black text-slate-900 shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:-translate-x-0.5"
          aria-label="Close popup"
        >
          ×
        </button>

        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="text-xs font-black uppercase tracking-[0.6em] text-pink-600">Too Smooth to Care?</p>
          <h2 id="exit-intent-title" className="text-3xl font-black uppercase leading-tight text-slate-900 drop-shadow-[4px_4px_0_#f472b6] sm:text-4xl lg:text-5xl">
            Join 1,000+ rebels before this window slams shut.
          </h2>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
            graffiti tips • underground drops • zero spam
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative rounded-2xl border-4 border-black bg-white/90 p-5 shadow-[8px_8px_0_#000] sm:p-6">
            <div className="pointer-events-none absolute -top-4 left-6 rotate-[-4deg] border-2 border-black bg-lime-200 px-3 py-1 text-xs font-black uppercase">
              Street Dispatch
            </div>
            <div className="pointer-events-none absolute -right-3 bottom-4 rotate-[6deg] border-2 border-black bg-amber-200 px-3 py-1 text-xs font-black uppercase">
              Skate or Subscribe
            </div>
            <NewsletterForm className="relative mt-4" variant="loud" />
          </div>

          <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 sm:text-sm sm:gap-4">
            <div className="flex items-start gap-3 border-2 border-dashed border-black/70 bg-white/70 px-3 py-3 shadow-[6px_6px_0_#000] sm:px-4">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white">1</span>
              Early graffiti tutorials from the Vispea pit crew.
            </div>
            <div className="flex items-start gap-3 border-2 border-dashed border-black/70 bg-white/70 px-3 py-3 shadow-[6px_6px_0_#000] sm:px-4">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-black">2</span>
              Underground merch drops before they hit the shop.
            </div>
            <div className="flex items-start gap-3 border-2 border-dashed border-black/70 bg-white/70 px-3 py-3 shadow-[6px_6px_0_#000] sm:px-4">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-black">3</span>
              Invite-only warehouse shows, announced at 3am.
            </div>
            <div className="mt-4 text-[11px] font-bold tracking-[0.4em] text-slate-500">
              Exit to keep scrolling. Enter email to join the rebellion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
