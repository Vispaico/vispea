import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Vispea",
  description: "Secure Vispea checkout – review your cart and complete your order with free worldwide shipping.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
