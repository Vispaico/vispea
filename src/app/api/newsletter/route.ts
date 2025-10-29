import { NextResponse } from "next/server";
import { z } from "zod";

import { sendEmail } from "@/lib/email";

const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, honeypot } = newsletterSchema.parse(body);

    if (honeypot) {
      // This is a bot, silently ignore the submission
      return NextResponse.json({ success: true });
    }

    await sendEmail({
      to: "newsletter@vispea.com",
      subject: "New Vispea Storybook signup",
      html: `
        <p>A new subscriber has joined the Vispea Storybook.</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues.map((issue) => issue.message).join(", ") }, { status: 400 });
    }

    console.error("Newsletter signup error", error);
    return NextResponse.json({ error: "Unable to submit signup. Please try again later." }, { status: 500 });
  }
}
