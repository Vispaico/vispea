import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact | Vispea",
  description: "Reach out to Vispea – we’re here for questions, collabs, and all that street-level noise.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:px-10">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Contact</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Hit us up – the inbox is always open
        </h1>
        <p className="max-w-2xl text-base text-slate-300">
          Questions about your order, or just want to talk graffiti philosophy and awesome music? Drop us a line and we’ll get back to you.
        </p>
      </header>

      <ContactForm />
    </div>
  );
}
