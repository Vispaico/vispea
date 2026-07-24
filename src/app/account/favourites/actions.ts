"use server";

import { revalidatePath } from "next/cache";

import { getServerSession } from "next-auth/next";
import { and, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { favourites } from "@/lib/db/schema";

export async function removeFavourite(formData: FormData) {
  const productId = Number.parseInt(String(formData.get("productId") ?? ""), 10);

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  if (!Number.isFinite(productId)) {
    revalidatePath("/account/favourites");
    return;
  }

  await db
    .delete(favourites)
    .where(and(eq(favourites.userId, session.user.id), eq(favourites.productId, productId)));

  revalidatePath("/account/favourites");
}
