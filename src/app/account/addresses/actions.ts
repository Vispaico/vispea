"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";

import { getServerSession } from "next-auth/next";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addresses } from "@/lib/db/schema";

const addressInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address1: z.string().min(1),
  address2: z.string().optional().nullable(),
  city: z.string().min(1),
  state: z.string().optional().nullable(),
  zip: z.string().min(1),
  country: z.string().length(2),
  phone: z.string().optional().nullable(),
  isDefault: z.boolean().optional(),
});

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  return session.user.id;
}

export async function createAddress(formData: FormData) {
  const userId = await requireUserId();

  const parsed = addressInputSchema.parse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    address1: String(formData.get("address1") ?? ""),
    address2: (formData.get("address2") ?? "") || null,
    city: String(formData.get("city") ?? ""),
    state: (formData.get("state") ?? "") || null,
    zip: String(formData.get("zip") ?? ""),
    country: String(formData.get("country") ?? ""),
    phone: (formData.get("phone") ?? "") || null,
    isDefault: formData.get("isDefault") === "on",
  });

  const now = new Date();
  const id = crypto.randomUUID();

  const existing = await db
    .select({ id: addresses.id })
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .limit(1);

  const shouldBeDefault = parsed.isDefault ?? existing.length === 0;

  await db.transaction(async (tx) => {
    if (shouldBeDefault) {
      await tx.update(addresses).set({ isDefault: false, updatedAt: now }).where(eq(addresses.userId, userId));
    }

    await tx.insert(addresses).values({
      id,
      userId,
      isDefault: shouldBeDefault,
      name: parsed.name,
      email: parsed.email,
      address1: parsed.address1,
      address2: parsed.address2,
      city: parsed.city,
      state: parsed.state ?? undefined,
      zip: parsed.zip,
      country: parsed.country,
      phone: parsed.phone ?? undefined,
      createdAt: now,
      updatedAt: now,
    });
  });

  revalidatePath("/account/addresses");
}

export async function updateAddress(formData: FormData) {
  const userId = await requireUserId();
  const id = String(formData.get("id") ?? "");

  const parsed = addressInputSchema.omit({ isDefault: true }).parse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    address1: String(formData.get("address1") ?? ""),
    address2: (formData.get("address2") ?? "") || null,
    city: String(formData.get("city") ?? ""),
    state: (formData.get("state") ?? "") || null,
    zip: String(formData.get("zip") ?? ""),
    country: String(formData.get("country") ?? ""),
    phone: (formData.get("phone") ?? "") || null,
  });

  const now = new Date();

  await db
    .update(addresses)
    .set({
      name: parsed.name,
      email: parsed.email,
      address1: parsed.address1,
      address2: parsed.address2,
      city: parsed.city,
      state: parsed.state ?? undefined,
      zip: parsed.zip,
      country: parsed.country,
      phone: parsed.phone ?? undefined,
      updatedAt: now,
    })
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)));

  revalidatePath("/account/addresses");
}

export async function deleteAddress(formData: FormData) {
  const userId = await requireUserId();
  const id = String(formData.get("id") ?? "");

  const [address] = await db
    .select({ id: addresses.id, isDefault: addresses.isDefault })
    .from(addresses)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
    .limit(1);

  if (!address) {
    revalidatePath("/account/addresses");
    return;
  }

  await db.transaction(async (tx) => {
    await tx.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.userId, userId)));

    if (address.isDefault) {
      const [next] = await tx
        .select({ id: addresses.id })
        .from(addresses)
        .where(eq(addresses.userId, userId))
        .orderBy(desc(addresses.createdAt))
        .limit(1);

      if (next) {
        await tx.update(addresses).set({ isDefault: true }).where(and(eq(addresses.id, next.id), eq(addresses.userId, userId)));
      }
    }
  });

  revalidatePath("/account/addresses");
}

export async function setDefaultAddress(formData: FormData) {
  const userId = await requireUserId();
  const id = String(formData.get("id") ?? "");
  const now = new Date();

  await db.transaction(async (tx) => {
    await tx.update(addresses).set({ isDefault: false, updatedAt: now }).where(eq(addresses.userId, userId));
    await tx.update(addresses).set({ isDefault: true, updatedAt: now }).where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
  });

  revalidatePath("/account/addresses");
}
