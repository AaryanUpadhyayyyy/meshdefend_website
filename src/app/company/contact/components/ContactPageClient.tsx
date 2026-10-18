"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "../contact.css";

export function ContactForm() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent") || searchParams.get("topic") || "";

  const getInitialTopic = (intent: string) => {
    switch (intent.toLowerCase()) {
      case "demo":
        return "Demo or Technical Walkthrough";
      case "rva":
      case "assessment":
        return "Cyber Resilience & RVA Assessment";
      case "arch-review":
      case "security-review":
        return "Architecture & Security Review";
      case "msp":
        return "MSP & Partner Program";
      case "si":
      case "si-technical":
      case "si-alliance":
        return "Systems Integrator Inquiry";
      case "advisory":
        return "Advisory & Consulting Partnership";
      case "legal":
      case "privacy":
        return "Legal & Compliance Inquiry";
      default:
        return "Demo or Technical Walkthrough";
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    topic: getInitialTopic(intentParam),
    message: "",
    marketingOptIn: false,
    website: "", // Honeypot
  });

  useEffect(() => {
    if (intentParam) {
      setFormData((prev) => ({
        ...prev,
        topic: getInitialTopic(intentParam),
      }));
    }
  }, [intentParam]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          jobTitle: "",
          topic: getInitialTopic(intentParam),
          message: "",
          marketingOptIn: false,
          website: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please check your inputs or try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please try again or reach us at hello@meshdefend.ai."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "32px 24px",
          background: "rgba(244, 85, 50, 0.06)",
          border: "1px solid rgba(244, 85, 50, 0.3)",
          borderRadius: 6,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--orange)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="display"
          style={{
            fontSize: 24,
            color: "var(--ink)",
            margin: "0 0 8px",
          }}
        >
          Message Received
        </h3>
        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: 440,
            margin: "0 auto 24px",
          }}
        >
          Thank you for reaching out. A systems engineer or resilience specialist from our team will respond shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="contact-submit-btn"
          style={{ padding: "10px 28px", fontSize: 14 }}
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field (strictly off-screen, inaccessible to genuine users) */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {/* FIRST NAME */}
      <div className="contact-field-group">
        <label htmlFor="firstName" className="contact-label">
          FIRST NAME <span className="contact-asterisk">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
          className="contact-input"
          autoComplete="given-name"
        />
      </div>

      {/* LAST NAME */}
      <div className="contact-field-group">
        <label htmlFor="lastName" className="contact-label">
          LAST NAME <span className="contact-asterisk">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
          className="contact-input"
          autoComplete="family-name"
        />
      </div>

      {/* EMAIL */}
      <div className="contact-field-group">
        <label htmlFor="email" className="contact-label">
          WORK EMAIL <span className="contact-asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="contact-input"
          autoComplete="email"
        />
      </div>

      {/* COMPANY NAME */}
      <div className="contact-field-group">
        <label htmlFor="companyName" className="contact-label">
          COMPANY NAME <span className="contact-asterisk">*</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          value={formData.companyName}
          onChange={handleChange}
          className="contact-input"
          autoComplete="organization"
        />
      </div>

      {/* JOB TITLE */}
      <div className="contact-field-group">
        <label htmlFor="jobTitle" className="contact-label">
          JOB TITLE <span className="contact-asterisk">*</span>
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          required
          value={formData.jobTitle}
          onChange={handleChange}
          className="contact-input"
          autoComplete="organization-title"
        />
      </div>

      {/* TOPIC / AREA OF INTEREST */}
      <div className="contact-field-group">
        <label htmlFor="topic" className="contact-label">
          AREA OF INTEREST <span className="contact-asterisk">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="contact-input"
          style={{ cursor: "pointer", background: "var(--surface)" }}
        >
          <option value="Demo or Technical Walkthrough">Request a Technical Demonstration</option>
          <option value="Cyber Resilience & RVA Assessment">Cyber Resilience &amp; RVA Assessment</option>
          <option value="Architecture & Security Review">Architecture &amp; Security Review</option>
          <option value="MSP & Partner Program">MSP &amp; Cloud Partner Program</option>
          <option value="Systems Integrator Inquiry">Systems Integrator Inquiry</option>
          <option value="Advisory & Consulting Partnership">Advisory &amp; Consulting Partnership</option>
          <option value="Legal & Compliance Inquiry">Legal &amp; Compliance Inquiry</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      {/* MESSAGE */}
      <div className="contact-field-group">
        <label htmlFor="message" className="contact-label">
          MESSAGE / REQUIREMENTS
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your backup estate, multi-cloud environment, or resilience goals..."
          value={formData.message}
          onChange={handleChange}
          className="contact-input contact-textarea"
        />
      </div>

      {/* Error state alert */}
      {status === "error" && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            background: "rgba(244, 85, 50, 0.08)",
            border: "1px solid var(--orange)",
            borderRadius: 4,
            color: "var(--orange)",
            fontSize: 13,
            lineHeight: 1.5,
            marginBottom: 20,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Marketing Opt-in Checkbox */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <input
          type="checkbox"
          id="marketingOptIn"
          name="marketingOptIn"
          checked={formData.marketingOptIn}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              marketingOptIn: e.target.checked,
            }))
          }
          style={{
            accentColor: "var(--orange)",
            width: 16,
            height: 16,
            marginTop: 2,
            cursor: "pointer",
          }}
        />
        <label
          htmlFor="marketingOptIn"
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 1.5,
            cursor: "pointer",
          }}
        >
          Keep me updated on product releases, threat research, and resilience engineering briefs. (Optional, unsubscribe anytime).
        </label>
      </div>

      {/* Clean Legal Consent Disclaimer */}
      <p className="contact-disclaimer" style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 20 }}>
        By submitting, you agree to our{" "}
        <Link href="/terms" className="contact-disclaimer-link">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="contact-disclaimer-link">
          Privacy Policy
        </Link>
        . We respect your confidentiality and never share your data with third-party advertising networks.
      </p>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="contact-submit-btn"
      >
        {isSubmitting ? (
          <>
            <svg
              style={{
                animation: "spin 1s linear infinite",
                width: 16,
                height: 16,
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
            Sending...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}

export function ContactFormSkeleton() {
  return (
    <div style={{ minHeight: "420px", display: "flex", flexDirection: "column", gap: 20, opacity: 0.6 }}>
      <div style={{ height: 48, background: "var(--surface)", borderRadius: 4 }} />
      <div style={{ height: 48, background: "var(--surface)", borderRadius: 4 }} />
      <div style={{ height: 48, background: "var(--surface)", borderRadius: 4 }} />
      <div style={{ height: 110, background: "var(--surface)", borderRadius: 4 }} />
      <div style={{ height: 44, width: 180, background: "var(--surface)", borderRadius: 4 }} />
    </div>
  );
}

export function ContactPageClient() {
  return <ContactForm />;
}
