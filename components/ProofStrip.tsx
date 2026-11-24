import { proof } from "@/lib/site";
import Reveal from "./Reveal";

export default function ProofStrip() {
  return (
    <section className="border-b border-ink/10 bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4 md:px-10 md:py-16">
        {proof.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.06} className="border-l border-ink/15 pl-5">
            <p className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-none tracking-[-0.02em]">{p.value}</p>
            <p className="kicker mt-3 text-[11px] leading-relaxed text-stone">{p.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
