import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { and, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addresses } from "@/lib/db/schema";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ data: null });
  }

  const [defaultAddress] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.userId, session.user.id), eq(addresses.isDefault, true)))
    .limit(1);

  return NextResponse.json({
    data: {
      user: { id: session.user.id, email: session.user.email },
      defaultAddress: defaultAddress ?? null,
    },
  });
}
