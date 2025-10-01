import { z } from "zod";

export const printfulVariantSchema = z.object({
  id: z.number(),
  externalId: z.string().nullable().optional(),
  variantId: z.number(),
  name: z.string(),
  retailPrice: z.string(),
  currency: z.string(),
  image: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
});

export const printfulProductSchema = z.object({
  id: z.number(),
  externalId: z.string().nullable().optional(),
  name: z.string(),
  thumbnailUrl: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
  sortOrder: z.number().optional(),
  variants: z.array(printfulVariantSchema),
});

export type PrintfulProduct = z.infer<typeof printfulProductSchema>;

export const cartItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  variantId: z.number(),
  variantName: z.string(),
  price: z.number(),
  currency: z.string(),
  quantity: z.number().int().positive(),
  image: z.string().nullable().optional(),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;

export const orderRecipientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address1: z.string().min(1),
  address2: z.string().optional().nullable(),
  city: z.string().min(1),
  state: z.string().optional(),
  zip: z.string().min(1),
  country: z.string().length(2),
  phone: z.string().optional(),
});

export const orderRequestSchema = z.object({
  paypalOrderId: z.string().min(1),
  recipient: orderRecipientSchema,
  items: z.array(cartItemSchema),
});

export type OrderRequestInput = z.infer<typeof orderRequestSchema>;

export const paypalCreateOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3).default("USD"),
});

export type PaypalCreateOrderInput = z.infer<typeof paypalCreateOrderSchema>;

export const paypalCaptureOrderSchema = z.object({
  orderId: z.string().min(1),
});

export type PaypalCaptureOrderInput = z.infer<typeof paypalCaptureOrderSchema>;

export const printfulWebhookEventSchema = z.object({
  type: z.string(),
  data: z.record(z.string(), z.unknown()),
});

export type PrintfulWebhookEvent = z.infer<typeof printfulWebhookEventSchema>;
