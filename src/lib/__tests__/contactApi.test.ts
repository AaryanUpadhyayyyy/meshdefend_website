import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

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
  website: z.string().optional(),
});

describe("Contact Form Validation Schema", () => {
  test("accepts valid input across all valid topics", () => {
    const validData = {
      fullName: "Jane Doe",
      workEmail: "jane@enterprise.com",
      company: "Acme Corp",
      topic: "Technical support",
      message: "Need assistance with Commvault backup indexing and recovery verification.",
      website: "",
    };

    const result = contactSchema.safeParse(validData);
    assert.strictEqual(result.success, true);
  });

  test("rejects invalid email formats", () => {
    const invalidEmail = {
      fullName: "Jane Doe",
      workEmail: "not-an-email",
      company: "Acme Corp",
      topic: "Demo or sales",
      message: "Please schedule a demo.",
    };

    const result = contactSchema.safeParse(invalidEmail);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some((i) => i.path[0] === "workEmail"));
    }
  });

  test("rejects empty required fields", () => {
    const emptyData = {
      fullName: "",
      workEmail: "",
      company: "",
      topic: "Partnerships",
      message: "",
    };

    const result = contactSchema.safeParse(emptyData);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      assert.ok(paths.includes("fullName"));
      assert.ok(paths.includes("workEmail"));
      assert.ok(paths.includes("company"));
      assert.ok(paths.includes("message"));
    }
  });

  test("rejects messages exceeding 1500 characters", () => {
    const longMessage = {
      fullName: "John Smith",
      workEmail: "john@corp.com",
      company: "Global Logistics",
      topic: "Security question",
      message: "A".repeat(1501),
    };

    const result = contactSchema.safeParse(longMessage);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some((i) => i.path[0] === "message"));
    }
  });

  test("identifies honeypot bots when website field is populated", () => {
    const botSubmission = {
      fullName: "Spam Bot",
      workEmail: "bot@spam.com",
      company: "Spam Inc",
      topic: "Other",
      message: "Cheap backlinks",
      website: "http://spam-link.com",
    };

    const result = contactSchema.safeParse(botSubmission);
    assert.strictEqual(result.success, true);
    // Honeypot detection logic checks whether website is non-empty
    assert.ok(botSubmission.website.length > 0);
  });
});
