import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Returns Policy | Vispea",
  description: "VISPEA return policy for defective or incorrect orders.",
  alternates: {
    canonical: "/refund-and-returns-policy",
  },
};

export default function RefundAndReturnsPolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="grid gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Refund & Returns</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Refund and Returns Policy
        </h1>
      </header>

      <div className="prose prose-invert max-w-none text-slate-300">
        <p>At VISPEA, we want you to be happy with your custom-printed shirts! If you’re not satisfied with your order, please review our return policy below:</p>
        <br/>
        <h2 className="text-2xl">Returns &amp; Exchanges</h2>
        <ul>
          <li>We accept returns or exchanges only for defective or incorrect items.</li>
          <li>Due to the custom nature of our products, we do not accept returns for change of mind or incorrect size selection. Please check our size guide before ordering.</li>
        </ul>
        <br/>
        <h2 className="text-2xl">How to Request a Return</h2>
        <ol>
          <li>Contact us at <a href="mailto:customer-care@vispea.com">customer-care@vispea.com</a> within 7 days of receiving your order.</li>
          <li>Provide your order number and photos of the issue (if applicable).</li>
          <li>Once approved, we will provide return instructions.</li>
        </ol>
        <br/>
        <h2 className="text-2xl">Refunds &amp; Replacements</h2>
        <ul>
          <li>If your item is defective or incorrect, we will offer a replacement or full refund at no extra cost.</li>
          <li>Refunds will be processed within 5-7 business days after we receive the returned item.</li>
        </ul>
        <br/>
        <h2 className="text-2xl">Non-Returnable Items</h2>
        <ul>
          <li>Custom designs with personal artwork (unless defective).</li>
          <li>Worn, washed, or altered items.</li>
          <li>Orders placed with incorrect details by the customer.</li>
        </ul>
        <br/>
        <p>If you have any questions, feel free to contact us at <a href="mailto:customer-care@vispea.com">customer-care@vispea.com</a>.</p>
      </div>
    </div>
  );
}
