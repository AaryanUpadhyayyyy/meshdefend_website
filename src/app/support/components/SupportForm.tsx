"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type { MeshState, TargetCluster } from "./SupportMesh3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export const TOPIC_OPTIONS = [
  "Technical support",
  "Demo or sales",
  "Partnerships",
  "Security question",
  "Other",
] as const;

export type FormTopic = (typeof TOPIC_OPTIONS)[number];

interface SupportFormProps {
  selectedTopic: FormTopic;
  onTopicChange: (topic: FormTopic, cluster?: TargetCluster) => void;
  onMeshStateChange: (state: MeshState) => void;
  targetCluster: TargetCluster;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  company?: string;
  message?: string;
}

export function SupportForm({
  selectedTopic,
  onTopicChange,
  onMeshStateChange,
  targetCluster,
}: SupportFormProps) {
  // Form state
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Validation & feedback state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Motion preferences
  const [reducedMotion, setReducedMotion] = useState(false);

  // Focused field for depth lift
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // DOM Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const chevronAgentRef = useRef<SVGSVGElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Magnetic button pull on desktop
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !submitButtonRef.current) return;
    const btn = submitButtonRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull up to 4px
    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = () => {
    if (reducedMotion || !submitButtonRef.current) return;
    gsap.to(submitButtonRef.current, {
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "elastic.out(1, 0.4)",
    });
  };

  // Field validation
  const validateField = (field: string, value: string): string | undefined => {
    if (field === "fullName") {
      if (!value.trim()) return "Full name is required";
      if (value.trim().length > 100) return "Max 100 characters";
    }
    if (field === "workEmail") {
      if (!value.trim()) return "Work email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return "Valid email required";
    }
    if (field === "company") {
      if (!value.trim()) return "Company is required";
      if (value.trim().length > 100) return "Max 100 characters";
    }
    if (field === "message") {
      if (!value.trim()) return "Message is required";
      if (value.length > 1500) return "Message cannot exceed 1500 characters";
    }
    return undefined;
  };

  const handleBlur = (field: string, value: string) => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // Trigger error shake animation
  const triggerErrorShake = () => {
    if (!cardRef.current) return;
    if (reducedMotion) return;
    gsap.fromTo(
      cardRef.current,
      { x: -6 },
      {
        x: 6,
        duration: 0.08,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(cardRef.current, { x: 0 });
        },
      }
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const nameErr = validateField("fullName", fullName);
    const emailErr = validateField("workEmail", workEmail);
    const compErr = validateField("company", company);
    const msgErr = validateField("message", message);

    const newErrors: FormErrors = {
      fullName: nameErr,
      workEmail: emailErr,
      company: compErr,
      message: msgErr,
    };

    setErrors(newErrors);
    setTouched({ fullName: true, workEmail: true, company: true, message: true });

    // Focus first invalid field if errors exist
    if (nameErr || emailErr || compErr || msgErr) {
      triggerErrorShake();
      setErrorMessage("Please fill out all required fields correctly.");
      if (nameErr) document.getElementById("fullName")?.focus();
      else if (emailErr) document.getElementById("workEmail")?.focus();
      else if (compErr) document.getElementById("company")?.focus();
      else if (msgErr) document.getElementById("message")?.focus();
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // 1. Submit to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          workEmail,
          company,
          topic: selectedTopic,
          message,
          website: honeypot, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      // If prefers-reduced-motion, jump directly to success state
      if (reducedMotion) {
        setIsSuccess(true);
        onMeshStateChange("verified");
        setIsSubmitting(false);
        return;
      }

      // 2. Advanced ~1.8s GSAP Submit Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSuccess(true);
          setIsSubmitting(false);
        },
      });

      // Step A: Physical button press
      tl.to(submitButtonRef.current, {
        scaleY: 0.96,
        duration: 0.12,
        ease: "power2.in",
      });

      // Step B: Fields compress and fade slightly
      tl.to(
        formFieldsRef.current,
        {
          opacity: 0.4,
          scale: 0.98,
          duration: 0.28,
          ease: "power2.out",
        },
        "-=0.04"
      );

      // Step C: Chevron agent spawns and flies along curved MotionPath to mesh
      const agent = chevronAgentRef.current;
      if (agent) {
        gsap.set(agent, {
          display: "block",
          opacity: 0,
          scale: 0.6,
          x: 0,
          y: 0,
        });

        tl.to(agent, {
          opacity: 1,
          scale: 1,
          duration: 0.15,
        });

        // Curved trajectory into the 3D mesh region
        tl.to(
          agent,
          {
            motionPath: {
              path: [
                { x: 30, y: -20 },
                { x: 120, y: -90 },
                { x: 220, y: -160 },
              ],
              curviness: 1.5,
              autoRotate: true,
            },
            duration: 0.75,
            ease: "power2.inOut",
          },
          "-=0.05"
        );

        tl.to(
          agent,
          {
            opacity: 0,
            scale: 0.4,
            duration: 0.15,
            onStart: () => {
              // Mesh state: receiving
              onMeshStateChange("receiving");
            },
          },
          "-=0.1"
        );
      } else {
        tl.call(() => onMeshStateChange("receiving"), [], "+=0.2");
      }

      // Step D: Mesh state turns verified (green)
      tl.call(
        () => {
          onMeshStateChange("verified");
        },
        [],
        "+=0.35"
      );

      // Step E: Success card rises
      tl.to(
        formFieldsRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.25,
        },
        "+=0.1"
      );
    } catch (err: any) {
      console.error(err);
      triggerErrorShake();
      setErrorMessage(
        "Something went wrong. Please try again or email hello@meshdefend.ai."
      );
      setIsSubmitting(false);
    }
  };

  const isFieldValid = (field: string, val: string) => {
    return touched[field] && !validateField(field, val);
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        backgroundColor: "#181818",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
        padding: "36px 32px",
        boxShadow: "0 24px 48px -16px rgba(0, 0, 0, 0.6)",
        perspective: 800,
      }}
    >
      {/* ─── HUD BAR ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
          marginBottom: 28,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* CSS Only Live Pulsing Dot */}
          <span
            className="hud-pulse-dot"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#fd4703",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 12,
              fontWeight: 600,
              color: "#fefdfd",
              letterSpacing: "0.06em",
            }}
          >
            ROUTING: {selectedTopic.toUpperCase()}
          </span>
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 12,
            color: "rgba(255, 255, 255, 0.45)",
          }}
        >
          [NODE: {targetCluster.toUpperCase()}]
        </span>
      </div>

      {/* Floating Animated Chevron Agent for Submit Sequence */}
      <svg
        ref={chevronAgentRef}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          right: "20px",
          width: 32,
          height: 32,
          pointerEvents: "none",
          display: "none",
          zIndex: 10,
        }}
      >
        <path d="M3 4H10.5L25 18.5V25.5L3 4Z" fill="#fd4703" />
        <path d="M3 13.5H10.5L20 23L29 14H29V21L20 30L3 13.5Z" fill="#fd4703" />
      </svg>

      {/* Status Live Region for Accessibility */}
      <div
        aria-live="assertive"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          border: 0,
        }}
      >
        {errorMessage || (isSuccess ? `Message received. We will reply to ${workEmail}.` : "")}
      </div>

      {/* ─── SUCCESS CARD STATE ─── */}
      {isSuccess ? (
        <div
          ref={successCardRef}
          style={{
            padding: "48px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: "rgba(61, 190, 122, 0.15)",
              border: "1.5px solid #3dbe7a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              color: "#3dbe7a",
              fontSize: 22,
            }}
          >
            ✓
          </div>

          <h3
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
              fontSize: 32,
              color: "#fefdfd",
              marginBottom: 12,
              fontWeight: 400,
            }}
          >
            Message received. We will reply to {workEmail}.
          </h3>

          <p
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: 15,
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: 1.5,
              maxWidth: 420,
              margin: "0 auto 32px",
            }}
          >
            Your request has been routed to the MeshDefend {selectedTopic.toLowerCase()} team.
          </p>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFullName("");
              setWorkEmail("");
              setCompany("");
              setMessage("");
              onMeshStateChange("idle");
            }}
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 12,
              fontWeight: 600,
              color: "#fd4703",
              backgroundColor: "transparent",
              border: "1px solid rgba(253, 71, 3, 0.4)",
              borderRadius: 3,
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Send another message →
          </button>
        </div>
      ) : (
        /* ─── ACTIVE FORM ─── */
        <form onSubmit={handleSubmit} noValidate>
          <div ref={formFieldsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Honeypot Field (Hidden for bot prevention) */}
            <div
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
                zIndex: -1,
                left: "-9999px",
              }}
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "rgba(253, 71, 3, 0.1)",
                  border: "1px solid #fd4703",
                  borderRadius: 3,
                  color: "#fefdfd",
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* 1. Full Name */}
            <div
              style={{
                position: "relative",
                transform: focusedField === "fullName" && !reducedMotion ? "translateZ(6px)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <label
                htmlFor="fullName"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: focusedField === "fullName" ? "#fd4703" : "rgba(255, 255, 255, 0.7)",
                  marginBottom: 6,
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
              >
                Full name *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={(e) => handleBlur("fullName", e.target.value)}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  style={{
                    width: "100%",
                    backgroundColor: "#111111",
                    color: "#fefdfd",
                    border: errors.fullName
                      ? "1px solid #fd4703"
                      : focusedField === "fullName"
                      ? "1px solid #fd4703"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: 3,
                    padding: "12px 14px",
                    fontFamily: "var(--font-body, Inter, sans-serif)",
                    fontSize: 14,
                    outline: "none",
                    boxShadow:
                      focusedField === "fullName"
                        ? "0 4px 12px -2px rgba(253, 71, 3, 0.25)"
                        : "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                />
                {isFieldValid("fullName", fullName) && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#3dbe7a",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
              {errors.fullName && (
                <span
                  id="fullName-error"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: "#fd4703",
                    marginTop: 4,
                  }}
                >
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* 2. Work Email */}
            <div
              style={{
                position: "relative",
                transform: focusedField === "workEmail" && !reducedMotion ? "translateZ(6px)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <label
                htmlFor="workEmail"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: focusedField === "workEmail" ? "#fd4703" : "rgba(255, 255, 255, 0.7)",
                  marginBottom: 6,
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
              >
                Work email *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="workEmail"
                  type="email"
                  required
                  value={workEmail}
                  onFocus={() => setFocusedField("workEmail")}
                  onBlur={(e) => handleBlur("workEmail", e.target.value)}
                  onChange={(e) => {
                    setWorkEmail(e.target.value);
                    if (errors.workEmail) {
                      setErrors((prev) => ({ ...prev, workEmail: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.workEmail)}
                  aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                  style={{
                    width: "100%",
                    backgroundColor: "#111111",
                    color: "#fefdfd",
                    border: errors.workEmail
                      ? "1px solid #fd4703"
                      : focusedField === "workEmail"
                      ? "1px solid #fd4703"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: 3,
                    padding: "12px 14px",
                    fontFamily: "var(--font-body, Inter, sans-serif)",
                    fontSize: 14,
                    outline: "none",
                    boxShadow:
                      focusedField === "workEmail"
                        ? "0 4px 12px -2px rgba(253, 71, 3, 0.25)"
                        : "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                />
                {isFieldValid("workEmail", workEmail) && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#3dbe7a",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
              {errors.workEmail && (
                <span
                  id="workEmail-error"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: "#fd4703",
                    marginTop: 4,
                  }}
                >
                  {errors.workEmail}
                </span>
              )}
            </div>

            {/* 3. Company */}
            <div
              style={{
                position: "relative",
                transform: focusedField === "company" && !reducedMotion ? "translateZ(6px)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <label
                htmlFor="company"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: focusedField === "company" ? "#fd4703" : "rgba(255, 255, 255, 0.7)",
                  marginBottom: 6,
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
              >
                Company *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="company"
                  type="text"
                  required
                  value={company}
                  onFocus={() => setFocusedField("company")}
                  onBlur={(e) => handleBlur("company", e.target.value)}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    if (errors.company) {
                      setErrors((prev) => ({ ...prev, company: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  style={{
                    width: "100%",
                    backgroundColor: "#111111",
                    color: "#fefdfd",
                    border: errors.company
                      ? "1px solid #fd4703"
                      : focusedField === "company"
                      ? "1px solid #fd4703"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: 3,
                    padding: "12px 14px",
                    fontFamily: "var(--font-body, Inter, sans-serif)",
                    fontSize: 14,
                    outline: "none",
                    boxShadow:
                      focusedField === "company"
                        ? "0 4px 12px -2px rgba(253, 71, 3, 0.25)"
                        : "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                />
                {isFieldValid("company", company) && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#3dbe7a",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
              {errors.company && (
                <span
                  id="company-error"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: "#fd4703",
                    marginTop: 4,
                  }}
                >
                  {errors.company}
                </span>
              )}
            </div>

            {/* 4. Topic Dropdown */}
            <div>
              <label
                htmlFor="topic"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                Topic
              </label>
              <select
                id="topic"
                value={selectedTopic}
                onChange={(e) => onTopicChange(e.target.value as FormTopic)}
                style={{
                  width: "100%",
                  backgroundColor: "#111111",
                  color: "#fefdfd",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: 3,
                  padding: "12px 14px",
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 14,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {TOPIC_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: "#181818" }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Message (max 1500 chars) */}
            <div
              style={{
                position: "relative",
                transform: focusedField === "message" && !reducedMotion ? "translateZ(6px)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 12,
                    color: focusedField === "message" ? "#fd4703" : "rgba(255, 255, 255, 0.7)",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                >
                  Message *
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: message.length > 1400 ? "#fd4703" : "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  {message.length} / 1500
                </span>
              </div>
              <textarea
                id="message"
                required
                maxLength={1500}
                rows={4}
                value={message}
                onFocus={() => setFocusedField("message")}
                onBlur={(e) => handleBlur("message", e.target.value)}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                style={{
                  width: "100%",
                  backgroundColor: "#111111",
                  color: "#fefdfd",
                  border: errors.message
                    ? "1px solid #fd4703"
                    : focusedField === "message"
                    ? "1px solid #fd4703"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: 3,
                  padding: "12px 14px",
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  outline: "none",
                  resize: "vertical",
                  boxShadow:
                    focusedField === "message"
                      ? "0 4px 12px -2px rgba(253, 71, 3, 0.25)"
                      : "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              />
              {errors.message && (
                <span
                  id="message-error"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: "#fd4703",
                    marginTop: 4,
                  }}
                >
                  {errors.message}
                </span>
              )}
            </div>

            {/* Consent Line with link to /privacy */}
            <div
              style={{
                fontFamily: "var(--font-body, Inter, sans-serif)",
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.5,
              }}
            >
              By submitting this form, you acknowledge and consent to our processing of this request in accordance with our{" "}
              <Link
                href="/privacy"
                style={{
                  color: "#fefdfd",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Privacy Policy
              </Link>
              .
            </div>

            {/* Submit Button (Magnetic Pull + Physical Press) */}
            <div>
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  backgroundColor: isSubmitting ? "#c5401f" : "#fd4703",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 3,
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: isSubmitting ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background-color 0.2s ease",
                  transformStyle: "preserve-3d",
                }}
              >
                <span>{isSubmitting ? "Routing to mesh..." : "Send message"}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ─── UNDER THE FORM LINKS & DIRECT EMAIL ─── */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Direct Email Line */}
        <div
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 12,
            color: "rgba(255, 255, 255, 0.65)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>Direct email:</span>
          <a
            href="mailto:hello@meshdefend.ai"
            style={{
              color: "#fd4703",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            hello@meshdefend.ai
          </a>
        </div>

        {/* Small Links under the form */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Link
            href="/resources/faq"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
          >
            Architecture FAQ ↗
          </Link>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
          <Link
            href="/security"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
          >
            Security posture ↗
          </Link>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
          <Link
            href="/demo"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
          >
            Book a demo ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
