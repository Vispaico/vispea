import crypto from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getServerSession } from "next-auth/next";
import { and, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { favourites } from "@/lib/db/schema";

const bodySchema = z.object({
  productId: z.number().int().positive(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { productId } = bodySchema.parse(body);

  const existing = await db
    .select({ id: favourites.id })
    .from(favourites)
    .where(and(eq(favourites.userId, session.user.id), eq(favourites.productId, productId)))
    .limit(1);

  if (existing[0]) {
    await db
      .delete(favourites)
      .where(and(eq(favourites.userId, session.user.id), eq(favourites.productId, productId)));
    return NextResponse.json({ data: { favourited: false } });
  }

  await db.insert(favourites).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    productId,
    createdAt: new Date(),
  });

  return NextResponse.json({ data: { favourited: true } });
}
