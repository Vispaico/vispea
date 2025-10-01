import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { submitPrintfulOrder } from "@/lib/printful";
import { orderRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = orderRequestSchema.parse(body);
    const order = await submitPrintfulOrder(payload);

    return NextResponse.json({ data: order });
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid Printful order payload" }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to submit order to Printful" }, { status: 500 });
  }
}
