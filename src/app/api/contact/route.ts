import { NextResponse } from "next/server";
import { z } from "zod";

import { sendEmail } from "@/lib/email";

const contactSchema = z.object({
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message, honeypot } = contactSchema.parse(body);

    if (honeypot) {
      // This is a bot, silently ignore the submission
      return NextResponse.json({ success: true });
    }

    await sendEmail({
      to: "contact@vispea.com",
      subject: "New contact message",
      html: `
        <p>You have received a new message via the contact form.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues.map((issue) => issue.message).join(", ") }, { status: 400 });
    }

    console.error("Contact form error", error);
    return NextResponse.json({ error: "Unable to send message. Please try again later." }, { status: 500 });
  }
}
