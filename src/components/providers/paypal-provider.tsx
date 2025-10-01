"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
  children: React.ReactNode;
};

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY ?? "USD";
const intent = process.env.NEXT_PUBLIC_PAYPAL_INTENT ?? "CAPTURE";

export function PaypalProvider({ children }: Props) {
  if (!clientId) {
    return children;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency,
        intent,
        components: "buttons",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
