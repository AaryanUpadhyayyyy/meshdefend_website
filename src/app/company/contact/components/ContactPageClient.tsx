"use client";

import React, { useState } from "react";
import "../contact.css";

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    message: "",
    website: "", // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
          message: "",
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

  return (
    <div className="contact-page-wrap">
      <div className="contact-container">
        {/* Top Header Section */}
        <div className="contact-header">
          <div className="contact-eyebrow">GET IN TOUCH</div>
          <h1 className="contact-title display">
            Contact <span className="contact-title-italic">Us</span>
          </h1>
        </div>

        {/* Two-Column Main Layout */}
        <div className="contact-grid">
          {/* ─── LEFT COLUMN: Message Form Card ─── */}
          <div className="contact-main-card">
            <h2 className="contact-card-title display">Send us a message</h2>
            <p className="contact-card-subhead">
              We&apos;d love to hear from you. Our team typically responds within one business day.
            </p>

            {status === "success" ? (
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
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field (hidden from genuine users) */}
                <div style={{ display: "none" }} aria-hidden="true">
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
                    EMAIL <span className="contact-asterisk">*</span>
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

                {/* MESSAGE */}
                <div className="contact-field-group">
                  <label htmlFor="message" className="contact-label">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-input contact-textarea"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(220, 38, 38, 0.08)",
                      border: "1px solid rgba(220, 38, 38, 0.25)",
                      borderRadius: 4,
                      color: "#dc2626",
                      fontSize: 14,
                      marginBottom: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Consent line */}
                <p className="contact-disclaimer">
                  By submitting, you opt in to marketing emails and ad-partner data sharing per our{" "}
                  <a href="/legal/privacy" className="contact-disclaimer-link">
                    privacy policy
                  </a>
                  . Unsubscribe anytime.
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
                    "Submit"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
