"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type NewsletterFormProps = {
  className?: string;
  variant?: "subtle" | "loud";
};

export function NewsletterForm({ className, variant = "subtle" }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const buttonClasses = useMemo(() => {
    if (variant === "loud") {
      return "inline-flex items-center justify-center gap-2 rounded-full border-4 border-black bg-gradient-to-r from-yellow-300 via-pink-400 to-orange-400 px-6 py-3 text-xs font-black uppercase tracking-[0.4em] text-slate-900 shadow-[5px_5px_0_#000] transition hover:-translate-y-1 hover:-translate-x-1 disabled:cursor-not-allowed disabled:opacity-60";
    }

    return "inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-slate-500";
  }, [variant]);

  const buttonLabel = status === "loading" ? "Joining…" : "Join the Storybook";

  const buttonContent = variant === "loud" ? (
    <>
      <span>{buttonLabel}</span>
      <span aria-hidden>✺</span>
    </>
  ) : (
    buttonLabel
  );

  return (
    <form
      className={`grid gap-4 ${className ?? ""}`}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const payload = {
          email: String(data.get("email") ?? ""),
          honeypot: String(data.get("honeypot") ?? ""),
        };

        setStatus("loading");
        setError(null);

        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error ?? "Signup failed");
          }

          setStatus("success");
          form.reset();
        } catch (caught) {
          setStatus("error");
          setError(caught instanceof Error ? caught.message : "Signup failed");
        }
      }}
    >
      <div className="grid gap-2">
        <label htmlFor="storybook-email" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Your Email
        </label>
        <input
          id="storybook-email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white focus:border-slate-500 focus:outline-none"
          placeholder="your@email.com"
        />
      </div>

      {/* Honeypot field to trap bots */}
      <div className="absolute left-[-5000px]" aria-hidden="true">
        <label htmlFor="newsletter-honeypot" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Don&apos;t fill this out if you&apos;re human
        </label>
        <input
          id="newsletter-honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-slate-500 focus:outline-none"
        />
      </div>

      <button type="submit" disabled={status === "loading"} className={buttonClasses}>
        {buttonContent}
      </button>

      {status === "success" ? (
        <p className="text-sm text-emerald-400">You’re in. Watch your inbox for the next drop.</p>
      ) : null}

      {status === "error" && error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}
    </form>
  );
}
