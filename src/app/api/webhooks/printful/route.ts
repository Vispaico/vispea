import { NextResponse } from "next/server";

import { parsePrintfulWebhook, verifyPrintfulWebhook } from "@/lib/printful";

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
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
