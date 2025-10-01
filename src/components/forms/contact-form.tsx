"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl backdrop-blur"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const payload = {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        };

        setStatus("loading");
        setError(null);

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error ?? "Something went wrong");
          }

          setStatus("success");
          form.reset();
        } catch (caught) {
          setStatus("error");
          setError(caught instanceof Error ? caught.message : "Something went wrong");
        }
      }}
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-slate-500 focus:outline-none"
          placeholder="Vispea legend"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-slate-500 focus:outline-none"
          placeholder="you@vispea.com"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="resize-none rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-slate-500 focus:outline-none"
          placeholder="Drop your message here..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {status === "loading" ? "Sending…" : "Send it"}
      </button>

      {status === "success" ? (
        <p className="text-sm text-emerald-400">Message sent. We’ll get back to you soon.</p>
      ) : null}

      {status === "error" && error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}
    </form>
  );
}
