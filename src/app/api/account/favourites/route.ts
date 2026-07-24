import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { favourites } from "@/lib/db/schema";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ data: [] }, { status: 401 });
  }

  const rows = await db
    .select({ productId: favourites.productId })
    .from(favourites)
    .where(eq(favourites.userId, session.user.id));

  return NextResponse.json({ data: rows.map((r) => r.productId) });
}
