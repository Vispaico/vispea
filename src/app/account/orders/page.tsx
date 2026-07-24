import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { desc, eq, inArray, sql } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Orders | Vispea",
  alternates: { canonical: "/account/orders" },
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/account/sign-in");
  }

  const userId = session.user.id;

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  const orderIds = rows.map((o) => o.id);

  const itemCounts = new Map<string, number>();
  if (orderIds.length) {
    const counts = await db
      .select({
        orderId: orderItems.orderId,
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(orderItems)
      .where(inArray(orderItems.orderId, orderIds))
      .groupBy(orderItems.orderId);

    for (const row of counts) {
      itemCounts.set(row.orderId, row.count);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Orders</h1>
          <p className="text-sm text-slate-300">Your order history and delivery status.</p>
        </div>
        <Link
          href="/account"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Back
        </Link>
      </header>

      {rows.length === 0 ? (
        <p className="text-sm text-slate-300">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {rows.map((order) => {
            const createdAt = new Date(order.createdAt);
            const formattedTotal = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: order.currency,
              minimumFractionDigits: 2,
            }).format(order.totalCents / 100);

            const count = itemCounts.get(order.id) ?? 0;

            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-white">{formattedTotal}</p>
                    <p className="text-xs text-slate-400">
                      {createdAt.toLocaleDateString()} · {count} item{count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="font-medium text-white/80">Status:</span>{" "}
                    {order.printfulStatus ?? "processing"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
