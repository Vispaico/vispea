"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AgentProduct = {
  id: string;
  name: string;
  price?: number | null;
  image?: string | null;
  url: string;
  tags?: string[];
  available?: boolean;
};

export const AgentWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "agent" | "user"; text: string }[]>([]);
  const [products, setProducts] = useState<AgentProduct[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const lastImpressionRef = useRef<string>("");
  const quickReplies = [
    "edgy graffiti",
    "minimal street",
    "colorful tags",
    "black and white",
    "hoodies",
    "tees",
  ];

  const send = useCallback(async (text: string) => {
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setLastQuery(text);
    setLoading(true);
    try {
      const res = await fetch("/api/vispea/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "agent", text: data.reply ?? "Sorry, no results." }]);
      setProducts(data.products ?? []);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "agent", text: "Oops — try again." }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const logClick = useCallback(
    (product: AgentProduct) => {
      const payload = {
        sessionId: sessionIdRef.current,
        query: lastQuery,
        productId: product.id,
        url: product.url,
        event: "click",
      };

      fetch("/api/vispea/agent/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => undefined);
    },
    [lastQuery]
  );

  const logImpressions = useCallback(
    (items: AgentProduct[]) => {
      if (!items.length) return;
      const impressionKey = `${lastQuery}::${items.map((item) => item.id).join("-")}`;
      if (impressionKey === lastImpressionRef.current) return;
      lastImpressionRef.current = impressionKey;

      const payload = {
        sessionId: sessionIdRef.current,
        query: lastQuery,
        event: "impression",
        products: items.map((product) => ({
          id: product.id,
          url: product.url,
        })),
      };

      fetch("/api/vispea/agent/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => undefined);
    },
    [lastQuery]
  );

  useEffect(() => {
    if (!open) return;
    logImpressions(products);
  }, [logImpressions, open, products]);

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen((s) => !s)}
          className="pointer-events-auto rounded-full border border-amber-300/60 bg-gradient-to-r from-fuchsia-500/80 via-amber-400/90 to-emerald-400/80 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(255,158,72,0.45)] transition hover:scale-[1.02]"
        >
          Neon Chat
        </button>
      </div>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[390px] rounded-3xl border border-fuchsia-400/40 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950/90 p-4 shadow-[0_24px_60px_rgba(63,13,94,0.6)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <strong className="text-sm tracking-[0.2em] text-fuchsia-200">
                VISPEA ASSIST
              </strong>
            </div>
            <button onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.2em] text-white/50">
              Close
            </button>
          </div>

          <div className="max-h-64 overflow-auto rounded-2xl border border-white/5 bg-slate-950/40 p-3">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-400">
                Ask me things like “edgy tees” or “show me colorful hats”.
              </p>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      m.role === "user"
                        ? "bg-fuchsia-500/20 text-fuchsia-100"
                        : "bg-slate-800/80 text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="mt-2 text-left">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/80 px-3 py-2 text-xs text-slate-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300 [animation-delay:300ms]" />
                  <span className="ml-1">Typing…</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickReplies.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => send(chip)}
                className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs uppercase tracking-wide text-fuchsia-100 transition hover:border-amber-300/70 hover:text-white"
              >
                {chip}
              </button>
            ))}
          </div>

          {products.length > 0 && (
            <div className="mt-3 grid gap-3">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  onClick={() => logClick(p)}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/60 p-3 transition hover:border-fuchsia-400/40 hover:bg-slate-900/70"
                >
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} width={56} height={56} className="h-14 w-14 rounded-md object-cover" />
                  ) : (
                    <div className="h-14 w-14 rounded-md bg-slate-700" />
                  )}
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{p.name}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-white/50">
                      {(p.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                      {p.available === false ? (
                        <span className="rounded-full border border-rose-400/40 bg-rose-500/10 px-2 py-0.5 text-rose-200">
                          sold out
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-200">
                          in stock
                        </span>
                      )}
                    </div>
                    {typeof p.price === "number" ? (
                      <div className="mt-1 text-xs text-slate-400">${p.price.toFixed(2)}</div>
                    ) : null}
                  </div>
                  <span className="text-xs font-semibold text-amber-200">View</span>
                </a>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              setInput("");
            }}
            className="mt-4 flex gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-2xl border border-fuchsia-400/30 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-white/40"
              placeholder='Try "minimal hoodies"'
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-amber-300 via-fuchsia-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_20px_rgba(250,204,21,0.25)] disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
