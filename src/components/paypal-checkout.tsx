"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

import type { OrderRequestInput } from "@/lib/validators";
import { CartItem, useCartStore } from "@/store/cart";

type Props = {
  items: CartItem[];
  recipient: OrderRequestInput["recipient"];
  currency: string;
  total: number;
  disabled: boolean;
  onSuccess: () => void;
};

const clientConfigured = Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

export function PaypalCheckout({ items, recipient, currency, total, disabled, onSuccess }: Props) {
  const clearCart = useCartStore((state) => state.clear);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const shouldDisable = disabled || processing || total <= 0;

  if (!clientConfigured) {
    return (
      <p className="text-sm text-amber-600">
        Configure your PayPal client ID to enable checkout. See the setup instructions below.
      </p>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">Your cart is empty.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <PayPalButtons
        style={{ layout: "vertical", color: "gold" }}
        disabled={shouldDisable}
        fundingSource={undefined}
        createOrder={async () => {
          setError(null);
          if (total <= 0) {
            throw new Error("Cart total must be greater than zero");
          }
          const response = await fetch("/api/paypal/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total, currency }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error ?? "Failed to create PayPal order");
          }

          return data.data.id;
        }}
        onApprove={async (data) => {
          setProcessing(true);
          try {
            const response = await fetch("/api/checkout/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paypalOrderId: data.orderID,
                recipient,
                items,
              }),
            });

            const json = await response.json();

            if (!response.ok) {
              throw new Error(json.error ?? "Checkout failed");
            }

            clearCart();
            onSuccess();
          } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
          } finally {
            setProcessing(false);
          }
        }}
        onError={(err) => {
          console.error(err);
          setError("PayPal experienced an error. Please refresh and try again.");
        }}
      />
    </div>
  );
}
