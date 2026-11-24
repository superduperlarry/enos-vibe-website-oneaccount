import { site } from "@/lib/site";

/** Review-only toggle between the two hero designs. Turn off with site.showVersionSwitch. */
export default function VersionSwitch({ current }: { current: "e" | "globe" }) {
  if (!site.showVersionSwitch) return null;
  const opts = [
    { href: "/", label: "Globe", key: "globe" },
    { href: "/latest", label: "Latest", key: "e" },
  ];
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-full border border-white/15 bg-deep-900/90 p-1 shadow-warm-md backdrop-blur-md">
      <span className="mono-label px-3 text-[10px] text-white/50">View</span>
      {opts.map((o) => (
        <a
          key={o.key}
          href={o.href}
          className={`press rounded-full px-4 py-1.5 text-[13px] font-semibold ${
            current === o.key ? "bg-chartreuse text-deep-900" : "text-white/80 hover:text-white"
          }`}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
