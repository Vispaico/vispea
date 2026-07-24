import { integer, sqliteTable, text, primaryKey, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// Auth.js / NextAuth (Drizzle Adapter) tables
export const users = sqliteTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
  },
  (table) => ({
    emailIdx: uniqueIndex("user_email_idx").on(table.email),
  }),
);

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
    userIdIdx: index("account_userId_idx").on(table.userId),
  }),
);

export const sessions = sqliteTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    userIdIdx: index("session_userId_idx").on(table.userId),
  }),
);

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  }),
);

// App tables
export const addresses = sqliteTable(
  "address",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isDefault: integer("isDefault", { mode: "boolean" }).notNull().default(false),
    name: text("name").notNull(),
    email: text("email").notNull(),
    address1: text("address1").notNull(),
    address2: text("address2"),
    city: text("city").notNull(),
    state: text("state"),
    zip: text("zip").notNull(),
    country: text("country").notNull(),
    phone: text("phone"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    userIdIdx: index("address_userId_idx").on(table.userId),
    defaultIdx: index("address_user_default_idx").on(table.userId, table.isDefault),
  }),
);

export const orders = sqliteTable(
  "orders",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    paypalOrderId: text("paypalOrderId").notNull(),
    printfulOrderId: integer("printfulOrderId"),
    printfulStatus: text("printfulStatus"),
    currency: text("currency").notNull(),
    totalCents: integer("totalCents").notNull(),
    recipientSnapshot: text("recipientSnapshot").notNull(),
    trackingSnapshot: text("trackingSnapshot"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    paypalOrderIdx: uniqueIndex("order_paypalOrderId_idx").on(table.paypalOrderId),
    userIdIdx: index("order_userId_idx").on(table.userId),
    printfulOrderIdx: index("order_printfulOrderId_idx").on(table.printfulOrderId),
  }),
);

export const orderItems = sqliteTable(
  "order_items",
  {
    id: text("id").primaryKey(),
    orderId: text("orderId")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("productId").notNull(),
    productName: text("productName").notNull(),
    variantId: integer("variantId").notNull(),
    variantName: text("variantName").notNull(),
    quantity: integer("quantity").notNull(),
    priceCents: integer("priceCents").notNull(),
    currency: text("currency").notNull(),
  },
  (table) => ({
    orderIdIdx: index("orderItem_orderId_idx").on(table.orderId),
  }),
);

export const favourites = sqliteTable(
  "favourite",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: integer("productId").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    uniqueIdx: uniqueIndex("favourite_unique_idx").on(table.userId, table.productId),
    userIdIdx: index("favourite_userId_idx").on(table.userId),
  }),
);

export const promotions = sqliteTable(
  "promotion",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull(),
    description: text("description"),
    percentOff: integer("percentOff"),
    expiresAt: integer("expiresAt", { mode: "timestamp_ms" }),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex("promotion_code_idx").on(table.code),
  }),
);

export const userPromotions = sqliteTable(
  "userPromotion",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    promotionId: text("promotionId")
      .notNull()
      .references(() => promotions.id, { onDelete: "cascade" }),
    redeemedAt: integer("redeemedAt", { mode: "timestamp_ms" }),
    assignedAt: integer("assignedAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.promotionId] }),
    userIdIdx: index("userPromotion_userId_idx").on(table.userId),
  }),
);
