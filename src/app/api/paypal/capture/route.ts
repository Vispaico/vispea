import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { capturePaypalOrder } from "@/lib/paypal";
import { paypalCaptureOrderSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = paypalCaptureOrderSchema.parse(body);

    const capture = await capturePaypalOrder(payload.orderId);
    return NextResponse.json({ data: capture });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid capture payload" }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to capture PayPal order" }, { status: 500 });
  }
}
