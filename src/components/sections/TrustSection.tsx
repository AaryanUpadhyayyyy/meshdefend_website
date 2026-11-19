"use client";



import React from "react";

import { Reveal } from "@/components/motion";

import { TRUST_SECTION_CONTENT } from "@/lib/homeSections";



export type TrustSectionContent = Partial<typeof TRUST_SECTION_CONTENT>;

export type TrustSectionCMSContent = TrustSectionContent;



export function TrustSection({

  content,

}: {

  content?: TrustSectionContent;

} = {}) {

  const partners = content?.partners ?? TRUST_SECTION_CONTENT.partners;

  const partnersLabel = content?.partnersLabel ?? TRUST_SECTION_CONTENT.partnersLabel ?? "";



  return (

    <section

      id="trust"

      className="home-trust-section"

      style={{

        padding: "48px 0 56px",

        // borderTop removed for seamless flow

        // borderBottom removed for seamless flow

        background: "var(--bg)",

        position: "relative",

      }}

    >

      <div

        className="container"

        style={{

          maxWidth: 1180,

          width: "min(1180px, calc(100% - 48px))",

          margin: "0 auto",

        }}

      >

        <Reveal variant="fade" delay={0}>

          {/* Section Eyebrow / Label */}

          {partnersLabel ? (

            <div

              style={{

                textAlign: "center",

                marginBottom: 28,

              }}

            >

              <span

                style={{

                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',

                  fontSize: 11.5,

                  letterSpacing: "0.14em",

                  color: "var(--muted)",

                  textTransform: "uppercase",

                  fontWeight: 600,

                }}

              >

                {partnersLabel}

              </span>

            </div>

          ) : null}



          {/* Logo Card Grid (Matching Image 1) */}

          <div className="trust-logo-grid">

            {partners.map((partner, index) => (

              <div

                key={`${partner.name}-${index}`}

                className="trust-logo-card"

                title={partner.name}

              >

                {partner.lightSrc && (

                  <img

                    src={partner.lightSrc}

                    alt={partner.name}

                    className="trust-logo-img trust-logo-img--light"

                    style={{ height: partner.height || 28 }}

                  />

                )}

                {partner.darkSrc && (

                  <img

                    src={partner.darkSrc}

                    alt={partner.name}

                    aria-hidden="true"

                    className="trust-logo-img trust-logo-img--dark"

                    style={{ height: partner.height || 28 }}

                  />

                )}

              </div>

            ))}

          </div>

        </Reveal>

      </div>



      <style>{`

        .trust-logo-grid {

          display: grid;

          grid-template-columns: repeat(4, minmax(0, 1fr));

          gap: 16px;

          width: 100%;

        }



        .trust-logo-card {

          display: flex;

          align-items: center;

          justify-content: center;

          height: 84px;

          padding: 16px 24px;

          background: #ffffff;

          border: 1px solid rgba(0, 0, 0, 0.07);

          border-radius: 12px;

          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);

          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;

          cursor: default;

        }



        .trust-logo-card:hover {

          transform: translateY(-2px);

          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03);

          border-color: rgba(244, 85, 50, 0.25);

        }



        .trust-logo-img {

          display: block;

          max-height: 34px;

          width: auto;

          max-width: 170px;

          object-fit: contain;

          pointer-events: none;

        }



        .trust-logo-img--light {

          display: block !important;

        }



        .trust-logo-img--dark {

          display: none !important;

        }



        [data-theme="dark"] .trust-logo-card,

        html.dark .trust-logo-card,

        .dark .trust-logo-card {

          background: rgba(255, 255, 255, 0.03) !important;

          border-color: rgba(255, 255, 255, 0.09) !important;

          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;

        }



        [data-theme="dark"] .trust-logo-card:hover,

        html.dark .trust-logo-card:hover,

        .dark .trust-logo-card:hover {

          background: rgba(255, 255, 255, 0.06) !important;

          border-color: rgba(244, 85, 50, 0.4) !important;

          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45) !important;

        }



        [data-theme="dark"] .trust-logo-img--light,

        html.dark .trust-logo-img--light,

        .dark .trust-logo-img--light {

          display: none !important;

        }



        [data-theme="dark"] .trust-logo-img--dark,

        html.dark .trust-logo-img--dark,

        .dark .trust-logo-img--dark {

          display: block !important;

        }



        @media (max-width: 1024px) {

          .trust-logo-grid {

            grid-template-columns: repeat(2, minmax(0, 1fr));

            gap: 14px;

          }

          .trust-logo-card {

            height: 76px;

          }

        }



        @media (max-width: 480px) {

          .trust-logo-grid {

            grid-template-columns: 1fr;

            gap: 10px;

          }

          .trust-logo-card {

            height: 70px;

          }

        }

      `}</style>

    </section>

  );

}

