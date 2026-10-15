import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for contact form submission
const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Full name must be under 100 characters"),
  workEmail: z
    .string()
    .trim()
    .email("Please provide a valid work email")
    .max(120, "Email must be under 120 characters"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(100, "Company name must be under 100 characters"),
  topic: z.enum([
    "Technical support",
    "Demo or sales",
    "Partnerships",
    "Security question",
    "Other",
  ]),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1500, "Message cannot exceed 1500 characters"),
  // Honeypot field - must remain empty
  website: z.string().optional(),
});

// Simple in-memory rate limiting (5 requests per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  ipRateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (ipRateLimitMap.size > 1000) {
    for (const [key, times] of ipRateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipRateLimitMap.delete(key);
      }
    }
  }

  return true;
}

// Basic input sanitization
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "") // Strip raw HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // Strip non-printable ASCII
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP identification & rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again or email hello@meshdefend.ai.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission data.",
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot check: If website field is populated, silently drop bot submission
    if (data.website && data.website.trim().length > 0) {
      // Fake successful response to trick bot scrapers
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 4. Sanitize inputs
    const sanitizedData = {
      fullName: sanitize(data.fullName),
      workEmail: sanitize(data.workEmail),
      company: sanitize(data.company),
      topic: data.topic,
      message: sanitize(data.message),
    };

    // 5. Pluggable email dispatch via environment variables
    const recipientEmail =
      process.env.CONTACT_EMAIL_RECIPIENT || "hello@meshdefend.ai"; /* [VERIFY: Production recipient email] */
    const resendApiKey = process.env.RESEND_API_KEY;
    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;

    if (resendApiKey) {
      // Send via Resend REST API
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_EMAIL_FROM || "MeshDefend Form <onboarding@resend.dev>",
          to: recipientEmail,
          reply_to: sanitizedData.workEmail,
          subject: `[MeshDefend Support] ${sanitizedData.topic} - ${sanitizedData.company}`,
          text: `Name: ${sanitizedData.fullName}\nEmail: ${sanitizedData.workEmail}\nCompany: ${sanitizedData.company}\nTopic: ${sanitizedData.topic}\n\nMessage:\n${sanitizedData.message}`,
        }),
      });

      if (!res.ok) {
        // Minimal log without dumping sensitive content
        console.error(`[Contact API] Resend dispatch returned status ${res.status}`);
      }
    } else if (postmarkToken) {
      // Send via Postmark REST API
      const res = await fetch("https://api.postmarkapp.com/email", {
        method: "POST",
        headers: {
          "X-Postmark-Server-Token": postmarkToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          From: process.env.CONTACT_EMAIL_FROM || "support@meshdefend.ai",
          To: recipientEmail,
          ReplyTo: sanitizedData.workEmail,
          Subject: `[MeshDefend Support] ${sanitizedData.topic} - ${sanitizedData.company}`,
          TextBody: `Name: ${sanitizedData.fullName}\nEmail: ${sanitizedData.workEmail}\nCompany: ${sanitizedData.company}\nTopic: ${sanitizedData.topic}\n\nMessage:\n${sanitizedData.message}`,
        }),
      });

      if (!res.ok) {
        console.error(`[Contact API] Postmark dispatch returned status ${res.status}`);
      }
    } else {
      // Minimal safe server log in development / unconfigured environments (never log raw personal data beyond topic)
      console.log(
        `[Contact API] Dispatch simulated for topic: "${sanitizedData.topic}". Destination: ${recipientEmail}`
      );
    }

    return NextResponse.json({
      success: true,
      message: `Message received. We will reply to ${sanitizedData.workEmail}.`,
    });
  } catch (error) {
    console.error("[Contact API] Internal exception during form processing:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or email hello@meshdefend.ai.",
      },
      { status: 500 }
    );
  }
}
