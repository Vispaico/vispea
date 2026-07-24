"use client";

import { useEffect, useMemo, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

type ProviderMap = Awaited<ReturnType<typeof getProviders>>;

export default function SignInPage() {
  const [providers, setProviders] = useState<ProviderMap>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProviders()
      .then(setProviders)
      .catch((err) => {
        console.error(err);
        setProviders(null);
      });
  }, []);

  const hasEmailProvider = Boolean(providers?.email);
  const hasGoogleProvider = Boolean(providers?.google);

  const isEmailValid = useMemo(() => email.trim().includes("@"), [email]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16 sm:px-10">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Sign in</h1>
        <p className="text-sm text-slate-300">
          Sign in to see your orders, delivery status, favourites, saved addresses, and promos.
        </p>
      </header>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}

      <div className="flex flex-col gap-3">
        {hasGoogleProvider ? (
          <button
            type="button"
            onClick={async () => {
              setError(null);
              setSubmitting(true);
              try {
                await signIn("google", { callbackUrl: "/account" });
              } catch (err) {
                console.error(err);
                setError("Unable to start Google sign-in.");
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            Continue with Google
          </button>
        ) : null}

        {hasEmailProvider ? (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError(null);
              if (!isEmailValid) {
                setError("Enter a valid email address.");
                return;
              }
              setSubmitting(true);
              try {
                await signIn("email", { email: email.trim(), callbackUrl: "/account" });
              } catch (err) {
                console.error(err);
                setError("Unable to send sign-in link.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="flex flex-col gap-3"
          >
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              <span>Email (magic link)</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-slate-500 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Email me a sign-in link
            </button>
          </form>
        ) : null}

        {!hasEmailProvider && !hasGoogleProvider ? (
          <p className="text-sm text-amber-300">
            Sign-in providers are not configured yet. Add your Auth env vars and refresh.
          </p>
        ) : null}
      </div>
    </div>
  );
}
