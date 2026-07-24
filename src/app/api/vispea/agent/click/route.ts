import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z
  .object({
    sessionId: z.string().optional(),
    query: z.string().optional(),
    productId: z.string().optional(),
    url: z.string().optional(),
    event: z.enum(["click", "impression"]).default("click"),
    products: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
  })
  .refine((data) => {
    if (data.event === "click") {
      return Boolean(data.productId);
    }
    if (data.event === "impression") {
      return Boolean(data.products && data.products.length > 0);
    }
    return true;
  }, "Invalid event payload");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = BodySchema.parse(body);

    const getClientIp = (req: Request) => {
      const xf = req.headers.get("x-forwarded-for");
      if (xf) return xf.split(",")[0].trim();
      const xr = req.headers.get("x-real-ip");
      if (xr) return xr;
      return "unknown";
    };

    const ip = getClientIp(request);

    if (parsed.event === "impression") {
      console.info("[vispea-agent] impression", {
        ts: Date.now(),
        ip,
        sessionId: parsed.sessionId ?? "unknown",
        query: parsed.query ?? "",
        products: parsed.products ?? [],
      });
    } else {
      console.info("[vispea-agent] click", {
        ts: Date.now(),
        ip,
        sessionId: parsed.sessionId ?? "unknown",
        query: parsed.query ?? "",
        productId: parsed.productId,
        url: parsed.url ?? "",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
