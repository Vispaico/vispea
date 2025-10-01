"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PaypalCheckout } from "@/components/paypal-checkout";
import { COUNTRIES } from "@/lib/countries";
import type { OrderRequestInput } from "@/lib/validators";
import { calculateCartTotals, useCartStore } from "@/store/cart";

const initialRecipient: OrderRequestInput["recipient"] = {
  name: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
  phone: "",
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const totals = useMemo(() => calculateCartTotals(items), [items]);
  const [recipient, setRecipient] = useState(initialRecipient);
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      recipient.name.trim().length > 0 &&
      recipient.email.trim().length > 0 &&
      recipient.address1.trim().length > 0 &&
      recipient.city.trim().length > 0 &&
      recipient.zip.trim().length > 0 &&
      recipient.country.trim().length === 2
    );
  }, [recipient]);

  return (
    
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 text-slate-900 dark:text-slate-100 sm:px-10 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Checkout - Cart summary</h2>
          {items.length === 0 ? (
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
              Your cart is empty. <Link href="/" className="underline">Continue shopping</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex items-start justify-between gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-slate-500 dark:text-slate-400">{item.variantName}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: item.currency,
                        }).format(item.price)}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <span>Qty {item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="rounded-full border border-slate-300 px-2 py-0.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: totals.currency,
                  }).format(totals.totalAmount)}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                FREE SHIPPING WORLDWIDE
              </p>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Shipping details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span>Name</span>
              <input
                required
                value={recipient.name}
                onChange={(event) => setRecipient((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Jane Doe"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>Email</span>
              <input
                required
                type="email"
                value={recipient.email}
                onChange={(event) => setRecipient((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="jane@example.com"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm sm:col-span-2">
              <span>Address line 1</span>
              <input
                required
                value={recipient.address1}
                onChange={(event) => setRecipient((prev) => ({ ...prev, address1: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="123 Market Street"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm sm:col-span-2">
              <span>Address line 2</span>
              <input
                value={recipient.address2 ?? ""}
                onChange={(event) => setRecipient((prev) => ({ ...prev, address2: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Unit, suite, etc"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>City</span>
              <input
                required
                value={recipient.city}
                onChange={(event) => setRecipient((prev) => ({ ...prev, city: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="New York"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>State / Province</span>
              <input
                value={recipient.state ?? ""}
                onChange={(event) => setRecipient((prev) => ({ ...prev, state: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="CA"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>Postal code</span>
              <input
                required
                value={recipient.zip}
                onChange={(event) => setRecipient((prev) => ({ ...prev, zip: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="10001"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>Country</span>
              <select
                required
                value={recipient.country}
                onChange={(event) => setRecipient((prev) => ({ ...prev, country: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span>Phone</span>
              <input
                value={recipient.phone ?? ""}
                onChange={(event) => setRecipient((prev) => ({ ...prev, phone: event.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Optional"
              />
            </label>
          </div>
        </section>

        
      </div>

      <aside className="flex flex-col gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Payment</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Complete your purchase. FREE SHIPPING WORLDWIDE - FUCK YEAH.
          </p>
          <div className="mt-6">
            <PaypalCheckout
              items={items}
              recipient={recipient}
              currency={totals.currency}
              total={totals.totalAmount}
              disabled={!isFormValid}
              onSuccess={() => setSubmitted(true)}
            />
          </div>
          {submitted ? (
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              We have received the Payment. We are preparing your order. Thank you!.
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
