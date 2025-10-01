import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { capturePaypalOrder } from "@/lib/paypal";
import { submitPrintfulOrder } from "@/lib/printful";
import { orderRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = orderRequestSchema.parse(body);

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
