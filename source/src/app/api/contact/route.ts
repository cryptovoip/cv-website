import { NextResponse } from "next/server";

// Runs as a Node.js serverless function on Vercel.
export const runtime = "nodejs";

type ContactPayload = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let body: ContactPayload;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!firstName || !email || !message) {
        return NextResponse.json(
            { error: "Name, email and message are required." },
            { status: 400 }
        );
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    // Must be an address on a domain verified in your Resend account.
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !to) {
        console.error("Contact form is not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
        return NextResponse.json(
            { error: "The contact form is not configured yet. Please try again later." },
            { status: 500 }
        );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: `CryptoVoIP Website <${from}>`,
                to: [to],
                reply_to: email,
                subject: `New contact form message from ${fullName}`,
                text:
                    `Name: ${fullName}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}\n`,
            }),
        });

        if (!res.ok) {
            const detail = await res.text();
            console.error("Resend API error:", res.status, detail);
            return NextResponse.json(
                { error: "Failed to send message. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { error: "An error occurred while sending your message." },
            { status: 500 }
        );
    }
}
