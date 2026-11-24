import type { Metadata, Viewport } from "next";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/epilogue/latin-400.css";
import "@fontsource/epilogue/latin-500.css";
import "@fontsource/epilogue/latin-600.css";
import "@fontsource/spline-sans-mono/latin-400.css";
import "@fontsource/spline-sans-mono/latin-500.css";
import "@fontsource/spline-sans-mono/latin-600.css";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENOS One — One Account. Every Rail.",
  description:
    "ENOS One is the dollar account for one-person companies and every business in the Global South — get paid on local networks, hold dollars, and grow with AI.",
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  openGraph: {
    title: "ENOS One — One Account. Every Rail.",
    description: "The dollar account for one-person companies and every business in the Global South.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#123d32" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
