import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const ALLOWED_SERVICES = ["residential", "commercial", "government", "renovation", "other"] as const;
type Service = (typeof ALLOWED_SERVICES)[number];

type ContactPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: Service;
    message: string;
    website?: string;
};

const MAX_FIELD = 2000;
const MAX_MESSAGE = 5000;

function isNonEmptyString(v: unknown, max: number): v is string {
    return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function validate(body: Partial<ContactPayload>): string | null {
    if (!isNonEmptyString(body.firstName, MAX_FIELD)) return "First name is required.";
    if (!isNonEmptyString(body.lastName, MAX_FIELD)) return "Last name is required.";
    if (!isNonEmptyString(body.email, MAX_FIELD)) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "Please enter a valid email address.";
    if (!isNonEmptyString(body.phone, MAX_FIELD)) return "Phone number is required.";
    if (!isNonEmptyString(body.service, MAX_FIELD)) return "Service is required.";
    if (!ALLOWED_SERVICES.includes(body.service as Service)) return "Invalid service selection.";
    if (!isNonEmptyString(body.message, MAX_MESSAGE)) return "Message is required.";
    return null;
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

type EmailFields = Omit<ContactPayload, "website">;

function buildPlainText(f: EmailFields): string {
    return [
        `New contact form submission`,
        ``,
        `Name: ${f.firstName} ${f.lastName}`,
        `Email: ${f.email}`,
        `Phone: ${f.phone}`,
        `Service: ${f.service}`,
        ``,
        `Message:`,
        f.message,
    ].join("\n");
}

function buildHtml(f: EmailFields): string {
    const messageHtml = escapeHtml(f.message).replace(/\n/g, "<br />");
    return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
            <h2 style="color: #0E48CC;">New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(f.firstName)} ${escapeHtml(f.lastName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(f.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(f.phone)}</p>
            <p><strong>Service:</strong> ${escapeHtml(f.service)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px;">${messageHtml}</p>
        </div>
    `.trim();
}

export async function POST(request: Request) {
    let body: Partial<ContactPayload>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim() !== "") {
        return NextResponse.json({ success: true });
    }

    const errorMessage = validate(body);
    if (errorMessage) {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not set");
        return NextResponse.json(
            { error: "Email service is not configured" },
            { status: 500 }
        );
    }

    const { firstName, lastName, email, phone, service, message } = body as ContactPayload;
    const resend = new Resend(apiKey);

    try {
        const { error } = await resend.emails.send({
            from: "Blue Rock Website <onboarding@resend.dev>",
            to: ["info@bluerockremodeling.com"],
            replyTo: email,
            subject: `New ${service} inquiry from ${firstName} ${lastName}`,
            text: buildPlainText({ firstName, lastName, email, phone, service, message }),
            html: buildHtml({ firstName, lastName, email, phone, service, message }),
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send message. Please try again or call us directly." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Unexpected error sending email:", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try again or call us directly." },
            { status: 500 }
        );
    }
}
