import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { asc, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addresses } from "@/lib/db/schema";

import { createAddress, deleteAddress, setDefaultAddress, updateAddress } from "./actions";

export const metadata: Metadata = {
  title: "Addresses | Vispea",
  alternates: { canonical: "/account/addresses" },
};

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  const rows = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, session.user.id))
    .orderBy(asc(addresses.createdAt));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Addresses</h1>
          <p className="text-sm text-slate-300">Save and edit delivery addresses for faster checkout.</p>
        </div>
        <Link
          href="/account"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Back
        </Link>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Add a new address</h2>
        <form action={createAddress} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Name</span>
            <input name="name" required className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Email</span>
            <input name="email" type="email" required defaultValue={session.user.email ?? ""} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
            <span>Address line 1</span>
            <input name="address1" required className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
            <span>Address line 2</span>
            <input name="address2" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>City</span>
            <input name="city" required className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>State / Province</span>
            <input name="state" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Postal code</span>
            <input name="zip" required className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Country (2-letter code)</span>
            <input name="country" required defaultValue="US" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span>Phone</span>
            <input name="phone" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
            <input name="isDefault" type="checkbox" className="h-4 w-4" />
            <span>Set as default</span>
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/80"
            >
              Save address
            </button>
          </div>
        </form>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-white">Your saved addresses</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-slate-300">No saved addresses yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {rows.map((addr) => (
              <div key={addr.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {addr.name}{" "}
                      {addr.isDefault ? (
                        <span className="ml-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-200">
                          Default
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{addr.address1}{addr.address2 ? `, ${addr.address2}` : ""}</p>
                    <p className="text-sm text-slate-300">{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.zip}</p>
                    <p className="text-sm text-slate-300">{addr.country}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!addr.isDefault ? (
                      <form action={setDefaultAddress}>
                        <input type="hidden" name="id" value={addr.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
                        >
                          Make default
                        </button>
                      </form>
                    ) : null}
                    <form action={deleteAddress}>
                      <input type="hidden" name="id" value={addr.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/15"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white">
                    Edit
                  </summary>
                  <form action={updateAddress} className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input type="hidden" name="id" value={addr.id} />
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>Name</span>
                      <input name="name" required defaultValue={addr.name} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>Email</span>
                      <input name="email" type="email" required defaultValue={addr.email} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
                      <span>Address line 1</span>
                      <input name="address1" required defaultValue={addr.address1} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
                      <span>Address line 2</span>
                      <input name="address2" defaultValue={addr.address2 ?? ""} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>City</span>
                      <input name="city" required defaultValue={addr.city} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>State / Province</span>
                      <input name="state" defaultValue={addr.state ?? ""} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>Postal code</span>
                      <input name="zip" required defaultValue={addr.zip} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>Country</span>
                      <input name="country" required defaultValue={addr.country} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      <span>Phone</span>
                      <input name="phone" defaultValue={addr.phone ?? ""} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="rounded-full border border-slate-700 bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
                      >
                        Update address
                      </button>
                    </div>
                  </form>
                </details>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
