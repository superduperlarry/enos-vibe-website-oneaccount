import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const people = [
  { title: "One-person companies", body: "Consultants, developers and freelancers billing clients worldwide." },
  { title: "Small businesses", body: "Teams that need dollars and modern tools without a bank relationship." },
  { title: "Creators", body: "Get paid by platforms, brands and fans — from anywhere." },
  { title: "Global merchants", body: "Online sellers shipping across borders and collecting in dollars." },
];

export default function Audience() {
  return (
    <section id="who" className="scroll-mt-20 bg-mist text-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="kicker text-stone">Who it&apos;s for</p>
            <h2 className="mt-8 font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1] tracking-[-0.02em]">
              Young, global, and <em className="text-teal-ink">done waiting.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-lg font-light leading-relaxed text-ink/70 md:justify-self-end">
              Built first for the Global South. Open to anyone, anywhere, who sells to the world.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-ink/15">
          {people.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.05 * i}>
              <div className="group relative grid items-center gap-3 overflow-hidden border-b border-ink/15 py-8 md:grid-cols-[80px_1fr_1fr_auto] md:gap-8 md:py-10">
                <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-forest-900 transition-transform duration-500 ease-out group-hover:scale-y-100" aria-hidden />
                <span className="kicker relative text-stone transition-colors group-hover:text-lime md:pl-2">0{i + 1}</span>
                <h3 className="relative font-display text-[clamp(1.9rem,3.4vw,3.2rem)] leading-none transition-colors group-hover:text-white">{p.title}</h3>
                <p className="relative text-[17px] font-light text-ink/70 transition-colors group-hover:text-white/70">{p.body}</p>
                <ArrowUpRight className="relative hidden text-ink/40 transition-all group-hover:rotate-45 group-hover:text-lime md:block md:mr-2" size={28} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
