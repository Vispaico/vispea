import { NextResponse } from "next/server";

import { listPrintfulProducts } from "@/lib/printful";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") ?? "12", 10);
    const offset = Number.parseInt(searchParams.get("offset") ?? "0", 10);

    const { products, paging } = await listPrintfulProducts({ limit, offset });
    return NextResponse.json({ data: { products, paging } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch Printful products" }, { status: 500 });
  }
}
