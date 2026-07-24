import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { and, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Order | Vispea",
};

export default async function OrderDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  const { id } = await params;

  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, id), eq(orders.userId, session.user.id)))
    .limit(1);

  if (!order) {
    redirect("/account/orders");
  }

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  const createdAt = new Date(order.createdAt);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: order.currency,
    minimumFractionDigits: 2,
  }).format(order.totalCents / 100);

  const recipient = (() => {
    try {
      return JSON.parse(order.recipientSnapshot) as {
        name: string;
        email: string;
        address1: string;
        address2?: string | null;
        city: string;
        state?: string;
        zip: string;
        country: string;
        phone?: string;
      };
    } catch {
      return null;
    }
  })();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Order</h1>
          <p className="text-sm text-slate-300">
            {createdAt.toLocaleDateString()} · {formattedTotal}
          </p>
        </div>
        <Link
          href="/account/orders"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Back
        </Link>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Delivery status</h2>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-white/80">Printful:</span>{" "}
          {order.printfulStatus ?? "processing"}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Items</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => {
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: item.currency,
              minimumFractionDigits: 2,
            }).format(item.priceCents / 100);

            return (
              <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-white">{item.productName}</span>
                  <span className="text-slate-400">{item.variantName}</span>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-white">{formatted}</span>
                  <span className="text-xs text-slate-400">Qty {item.quantity}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Shipping</h2>
        {recipient ? (
          <div className="mt-3 text-sm text-slate-300">
            <p className="font-medium text-white">{recipient.name}</p>
            <p>{recipient.address1}</p>
            {recipient.address2 ? <p>{recipient.address2}</p> : null}
            <p>
              {recipient.city}
              {recipient.state ? `, ${recipient.state}` : ""} {recipient.zip}
            </p>
            <p>{recipient.country}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-300">Shipping details unavailable.</p>
        )}
      </section>
    </div>
  );
}
