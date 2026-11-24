/** A visibly marked gap for content only ENOS can supply (licence numbers, an endpoint, a fee). Fill it before publishing. */
export default function Placeholder({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`rounded-md border border-dashed px-1.5 py-0.5 font-mono text-[0.92em] [box-decoration-break:clone] ${
        tone === "dark" ? "border-saffron/70 bg-saffron/10 text-saffron" : "border-saffron bg-saffron/15 text-ink"
      }`}
    >
      {children}
    </span>
  );
}
