import type { Metadata, Viewport } from "next";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/epilogue/latin-300.css";
import "@fontsource/epilogue/latin-400.css";
import "@fontsource/epilogue/latin-500.css";
import "@fontsource/epilogue/latin-600.css";
import "@fontsource/spline-sans-mono/latin-400.css";
import "@fontsource/spline-sans-mono/latin-500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENOS — One account. The whole internet economy.",
  description:
    "A USD and USDC account for anyone, anywhere — plugged straight into the AI and SaaS tools your business runs on. No card. No borders. No bank branch.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "ENOS — One account. The whole internet economy.",
    description: "A USD and USDC account for anyone, anywhere, plugged into AI and SaaS.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#001a0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
