import crypto from "node:crypto";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { and, eq } from "drizzle-orm";

import { capturePaypalOrder } from "@/lib/paypal";
import { submitPrintfulOrder } from "@/lib/printful";
import { db } from "@/lib/db";
import { addresses, orderItems, orders, users } from "@/lib/db/schema";
import { orderRequestSchema } from "@/lib/validators";

type FraudLabsResponse = {
  fraudlabspro_status: "APPROVE" | "REVIEW" | "REJECT";
  fraudlabspro_id?: string;
  fraudlabspro_message?: string;
  fraudlabspro_score?: string;
};

async function screenWithFraudLabs(payload: ReturnType<typeof orderRequestSchema.parse>, ipAddress: string | null) {
  const apiKey = process.env.FRAUDLABS_API_KEY;
  if (!apiKey) {
    console.warn("FRAUDLABS_API_KEY is not set; skipping fraud screening");
    return null;
  }

  const amount = payload.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const currency = payload.items[0]?.currency ?? "USD";

  const response = await fetch("https://api.fraudlabspro.com/v1/order/screen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: apiKey,
      format: "json",
      order: {
        order_id: payload.paypalOrderId,
        amount: amount.toFixed(2),
        currency,
      },
      billing: {
        email: payload.recipient.email,
        phone: payload.recipient.phone ?? undefined,
        name: payload.recipient.name,
        address: payload.recipient.address1,
        address2: payload.recipient.address2 ?? undefined,
        city: payload.recipient.city,
        postal: payload.recipient.zip,
        state: payload.recipient.state ?? undefined,
        country: payload.recipient.country,
      },
      payment: {
        payment_mode: "PAYPAL",
      },
      customer_ip: ipAddress ?? undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FraudLabs Pro request failed: ${response.status} ${errorText}`);
  }

  const result = (await response.json()) as FraudLabsResponse;
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = orderRequestSchema.parse(body);

     // Attempt to extract the originating IP from headers (fall back to Request.ip)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor?.split(",")[0]?.trim() ?? null;

    const fraudResult = await screenWithFraudLabs(payload, clientIp);

    if (fraudResult?.fraudlabspro_status === "REJECT") {
      const message = fraudResult.fraudlabspro_message ?? "Order rejected by fraud screening";
      console.warn("FraudLabs Pro rejected order", {
        orderId: payload.paypalOrderId,
        message,
        score: fraudResult.fraudlabspro_score,
      });
      return NextResponse.json({ error: message }, { status: 403 });
    }

    const capture = await capturePaypalOrder(payload.paypalOrderId);
    const printful = await submitPrintfulOrder(payload);

    const now = new Date();
    const totalCents = payload.items.reduce(
      (total, item) => total + Math.round(item.price * 100) * item.quantity,
      0,
    );

    const recipientEmail = payload.recipient.email.trim().toLowerCase();
    const recipientName = payload.recipient.name.trim();

    await db.transaction(async (tx) => {
      const existingOrder = await tx
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.paypalOrderId, payload.paypalOrderId))
        .limit(1);

      if (existingOrder[0]) {
        await tx
          .update(orders)
          .set({
            printfulOrderId: printful.id,
            printfulStatus: printful.status,
            updatedAt: now,
          })
          .where(eq(orders.id, existingOrder[0].id));
        return;
      }

      const existingUser = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, recipientEmail))
        .limit(1);

      const userId = existingUser[0]?.id ?? crypto.randomUUID();

      if (!existingUser[0]) {
        await tx.insert(users).values({
          id: userId,
          email: recipientEmail,
          name: recipientName || null,
          emailVerified: null,
          image: null,
        });
      }

      const [defaultAddress] = await tx
        .select({ id: addresses.id })
        .from(addresses)
        .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)))
        .limit(1);

      await tx.update(addresses).set({ isDefault: false, updatedAt: now }).where(eq(addresses.userId, userId));

      if (defaultAddress) {
        await tx
          .update(addresses)
          .set({
            isDefault: true,
            name: payload.recipient.name,
            email: payload.recipient.email,
            address1: payload.recipient.address1,
            address2: payload.recipient.address2 ?? null,
            city: payload.recipient.city,
            state: payload.recipient.state ?? null,
            zip: payload.recipient.zip,
            country: payload.recipient.country,
            phone: payload.recipient.phone ?? null,
            updatedAt: now,
          })
          .where(eq(addresses.id, defaultAddress.id));
      } else {
        await tx.insert(addresses).values({
          id: crypto.randomUUID(),
          userId,
          isDefault: true,
          name: payload.recipient.name,
          email: payload.recipient.email,
          address1: payload.recipient.address1,
          address2: payload.recipient.address2 ?? null,
          city: payload.recipient.city,
          state: payload.recipient.state ?? null,
          zip: payload.recipient.zip,
          country: payload.recipient.country,
          phone: payload.recipient.phone ?? null,
          createdAt: now,
          updatedAt: now,
        });
      }

      const orderId = crypto.randomUUID();

      await tx.insert(orders).values({
        id: orderId,
        userId,
        paypalOrderId: payload.paypalOrderId,
        printfulOrderId: printful.id,
        printfulStatus: printful.status,
        currency: payload.items[0]?.currency ?? "USD",
        totalCents,
        recipientSnapshot: JSON.stringify(payload.recipient),
        createdAt: now,
        updatedAt: now,
      });

      await tx.insert(orderItems).values(
        payload.items.map((item) => ({
          id: crypto.randomUUID(),
          orderId,
          productId: item.productId,
          productName: item.productName,
          variantId: item.variantId,
          variantName: item.variantName,
          quantity: item.quantity,
          priceCents: Math.round(item.price * 100),
          currency: item.currency,
        })),
      );
    });

    return NextResponse.json({ data: { capture, printful } });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
    }

    return NextResponse.json({ error: "Checkout completion failed" }, { status: 500 });
  }
}
