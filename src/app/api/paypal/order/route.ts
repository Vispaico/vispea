import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { createPaypalOrder } from "@/lib/paypal";
import { paypalCreateOrderSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = paypalCreateOrderSchema.parse(body);

    const order = await createPaypalOrder(payload.amount, payload.currency);
    return NextResponse.json({ data: order });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create PayPal order" }, { status: 500 });
  }
}
