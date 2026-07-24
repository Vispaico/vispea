import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { getPrintfulOrder, parsePrintfulWebhook, verifyPrintfulWebhook } from "@/lib/printful";

export async function POST(request: Request) {
  const signature =
    request.headers.get("x-pf-signature") ??
    request.headers.get("x-pf-webhook-signature") ??
    null;

  const rawBody = await request.text();

  const valid = verifyPrintfulWebhook(signature, rawBody);

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = parsePrintfulWebhook(rawBody);
    console.log("Printful webhook received", event.type);

    const data = event.data as unknown as Record<string, unknown>;
    const nestedOrder = (data.order ?? null) as null | Record<string, unknown>;
    const idCandidate =
      (nestedOrder?.id as unknown) ??
      (data.order_id as unknown) ??
      (data.id as unknown) ??
      null;

    const printfulOrderId = typeof idCandidate === "number" ? idCandidate : Number.parseInt(String(idCandidate ?? ""), 10);

    if (Number.isFinite(printfulOrderId)) {
      const full = await getPrintfulOrder(printfulOrderId);
      const status = typeof full.status === "string" ? full.status : null;
      const externalId = typeof full.external_id === "string" ? full.external_id : null;

      const trackingSnapshot = JSON.stringify({
        shipments: full.shipments,
        shipping: full.shipping,
      });

      const now = new Date();

      const [byPrintful] = await db
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.printfulOrderId, printfulOrderId))
        .limit(1);

      if (byPrintful) {
        await db
          .update(orders)
          .set({
            printfulStatus: status ?? undefined,
            trackingSnapshot,
            updatedAt: now,
          })
          .where(eq(orders.id, byPrintful.id));
      } else if (externalId) {
        const [byExternal] = await db
          .select({ id: orders.id })
          .from(orders)
          .where(eq(orders.paypalOrderId, externalId))
          .limit(1);

        if (byExternal) {
          await db
            .update(orders)
            .set({
              printfulOrderId,
              printfulStatus: status ?? undefined,
              trackingSnapshot,
              updatedAt: now,
            })
            .where(eq(orders.id, byExternal.id));
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
