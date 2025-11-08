import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Vispea",
  description: "Sign in to manage your Vispea orders and future loyalty perks.",
  alternates: {
    canonical: "/account",
  },
};

export default function AccountPage() {
  return (
    <div className="grid gap-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Account</h1>
      <p className="text-base text-slate-300">
        Account dashboards are cooking. Soon you’ll track orders, manage drops, and flex loyalty perks right here.
      </p>
    </div>
  );
}
