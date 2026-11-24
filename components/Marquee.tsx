const words = ["One account", "Every rail", "No borders", "No bank branch", "Built in the South", "Ready for the world"];

export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-display text-[clamp(3rem,9vw,8.5rem)] italic leading-none text-forest-950">{w}</span>
          <span className="h-4 w-4 rotate-45 bg-forest-950 md:h-6 md:w-6" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="One account. Every rail. No borders. No bank branch." className="overflow-hidden bg-lime py-8 md:py-12">
      <div className="marquee flex w-max" style={{ ["--marquee-speed" as string]: "45s" }}>
        {row}
        {row}
      </div>
    </section>
  );
}
