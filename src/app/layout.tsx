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
  title: "MeshDefend — Agentic AI for Enterprise Resilience",
  description:
    "Powered by Agent Mesh™, MeshDefend unifies backup, recovery, and cyber resilience operations across heterogeneous environments. Continuously monitor, troubleshoot, and orchestrate recovery.",
  metadataBase: new URL("https://www.meshdefend.ai"),
  openGraph: {
    title: "MeshDefend — Agentic AI for Enterprise Resilience",
    description:
      "Recovery you can prove. Operations without human error.",
    siteName: "MeshDefend",
    type: "website",
    images: [
      {
        url: "/brand/wordmark.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend — Agentic AI for Enterprise Resilience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeshDefend — Agentic AI for Enterprise Resilience",
    description: "Recovery you can prove. Operations without human error.",
    images: ["/brand/wordmark.png"],
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
