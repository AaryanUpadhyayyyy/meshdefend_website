import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeshDefend — Resilience Operations Center (ResOC)",
  description:
    "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.",
  metadataBase: new URL("https://www.meshdefend.ai"),
  openGraph: {
    title: "MeshDefend — Resilience Operations Center (ResOC)",
    description:
      "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.",
    siteName: "MeshDefend",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend — Resilience Operations Center (ResOC)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeshDefend — Resilience Operations Center (ResOC)",
    description:
      "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function shouldIgnore(e) {
                  var str = (e.message || '') + ' ' + (e.filename || '') + ' ' + (e.reason ? (e.reason.message || '') + ' ' + (e.reason.stack || '') : '');
                  return str.indexOf('chrome-extension://') !== -1 || str.indexOf('moz-extension://') !== -1 || str.indexOf('MetaMask') !== -1;
                }
                window.addEventListener('unhandledrejection', function(e) {
                  if (shouldIgnore(e)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('error', function(e) {
                  if (shouldIgnore(e)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                }, true);
              })();
            `,
          }}
        />
        <noscript>
          <style>{`
            [data-reveal],
            [data-reveal-group],
            .reveal-group-item {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body>
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
