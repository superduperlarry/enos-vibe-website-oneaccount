import type { Metadata, Viewport } from "next";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-800.css";
import "@fontsource/playfair-display/latin-800-italic.css";
import "@fontsource/epilogue/latin-400.css";
import "@fontsource/epilogue/latin-500.css";
import "@fontsource/epilogue/latin-600.css";
import "@fontsource/spline-sans-mono/latin-400.css";
import "@fontsource/spline-sans-mono/latin-500.css";
import "@fontsource/spline-sans-mono/latin-600.css";
import "@fontsource-variable/inter";
import { site } from "@/lib/site";
import "./globals.css";

// Absolute base for the share image: the production domain on Vercel production, the deployment's own URL on previews.
const host = process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: "ENOS One — One Account. Every Rail.",
  description:
    "ENOS One is the dollar account for one-person companies and every business in the Global South — get paid on local networks, hold dollars, and grow with AI.",
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  openGraph: {
    title: "ENOS One — One Account. Every Rail.",
    description: "The dollar account for one-person companies and every business in the Global South.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // While the page carries a draft note, keep it out of search. Clearing draftNote in lib/site.ts lets it be indexed.
  robots: site.draftNote ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#123d32" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-chartreuse px-5 py-3 font-semibold text-deep-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
