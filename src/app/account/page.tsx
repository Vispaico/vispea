import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession as _getServerSession } from "next-auth/next";
import { getServerSession as shimGetServerSession } from "@/lib/nextAuth";

import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account | Vispea",
  description: "Sign in to manage your Vispea orders and future loyalty perks.",
  alternates: {
    canonical: "/account",
  },
};

export default async function AccountPage() {
  let session;
  try {
    session = await _getServerSession(authOptions);
  } catch {
    session = await shimGetServerSession(authOptions);
  }
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Account</h1>
        <p className="text-sm text-slate-300">
          Signed in as <span className="font-medium text-white">{session.user.email}</span>
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/account/orders"
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white">Orders</h2>
          <p className="mt-2 text-sm text-slate-300">Track delivery status and view your purchase history.</p>
        </Link>

        <Link
          href="/account/addresses"
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white">Addresses</h2>
          <p className="mt-2 text-sm text-slate-300">Save and edit delivery addresses for faster checkout.</p>
        </Link>

        <Link
          href="/account/favourites"
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white">Favourites</h2>
          <p className="mt-2 text-sm text-slate-300">Save items you like and come back later.</p>
        </Link>

        <Link
          href="/account/promotions"
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white">Promotions</h2>
          <p className="mt-2 text-sm text-slate-300">Your promotions and loyalty perks.</p>
        </Link>
      </div>

      <div>
        <Link
          href="/api/auth/signout?callbackUrl=/"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
