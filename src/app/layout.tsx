import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PaypalProvider } from "@/components/providers/paypal-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vispea Shop",
  description: "Modern print-on-demand storefront powered by Printful and PayPal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <PaypalProvider>
          <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
            <div className="fixed inset-x-0 top-0 z-50">
              <Header />
            </div>
            <main className="flex flex-1 flex-col pt-[80px]">
              {children}
            </main>
            <Footer />
          </div>
        </PaypalProvider>
      </body>
    </html>
  );
}
