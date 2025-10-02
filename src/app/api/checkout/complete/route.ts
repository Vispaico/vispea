import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { capturePaypalOrder } from "@/lib/paypal";
import { submitPrintfulOrder } from "@/lib/printful";
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

    return NextResponse.json({ data: { capture, printful } });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
    }

    return NextResponse.json({ error: "Checkout completion failed" }, { status: 500 });
  }
}
