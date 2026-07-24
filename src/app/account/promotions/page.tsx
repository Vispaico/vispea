import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Promotions | Vispea",
  alternates: { canonical: "/account/promotions" },
};

export default async function PromotionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Promotions</h1>
          <p className="text-sm text-slate-300">Your promotions and loyalty perks.</p>
        </div>
        <Link
          href="/account"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Back
        </Link>
      </header>

      <p className="text-sm text-slate-300">Coming next: targeted promotions, loyalty perks, and drop access.</p>
    </div>
  );
}
