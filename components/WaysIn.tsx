import { ArrowUpRight, Bot, Building2, Landmark, Network, Store } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const others = [
  { icon: Store, title: "Merchants & SMBs", body: "Collect on every local rail, hold dollars, pay suppliers and staff." },
  { icon: Building2, title: "Enterprises & traders", body: "Named accounts, multi-rail collection and same-day payouts on hard corridors." },
  { icon: Network, title: "PSPs & platforms", body: "Wholesale rails and one API for every local network we connect." },
  { icon: Landmark, title: "SPVs & deal vehicles", body: "An account in the vehicle's own name, with pooling and distributions." },
];

export default function WaysIn() {
  return (
    <section id="who" className="scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="kicker text-stone">Our mission</p>
          <h2 className="mt-8 max-w-[20ch] font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1] tracking-[-0.02em]">
            Built for one-person companies. <em className="text-teal-ink">Ready for every business.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-ink/70">
            The next billion businesses start with one founder and a laptop. We build {site.product} for them first, and the same account,
            the same rails, scale to the largest company on the network.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-forest-900 p-8 text-white md:p-12">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime/15 blur-3xl" aria-hidden />
              <div className="relative">
                <p className="kicker text-[11px] text-lime">Where we start</p>
                <h3 className="mt-8 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-[1]">
                  One-person <em className="text-lime">companies</em>
                </h3>
                <p className="mt-4 max-w-md text-[17px] font-light leading-relaxed text-white/70">
                  Freelancers, creators, consultants and online sellers who sell to the world and get stuck at the payment.
                </p>
              </div>
              <ul className="relative mt-12 grid gap-3 text-[15px] sm:grid-cols-2">
                {["Open from your phone", "Get paid on local networks", `Hold USD and ${site.stablecoin}`, "AI and SaaS from day one"].map((pt) => (
                  <li key={pt} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.title} delay={0.06 * (i + 1)}>
                <article className="h-full rounded-3xl border border-ink/10 bg-white/70 p-7 transition duration-500 hover:-translate-y-1 hover:bg-white">
                  <o.icon size={22} className="text-teal-ink" />
                  <h3 className="mt-6 font-display text-[1.6rem] leading-tight">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{o.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-6 rounded-3xl border border-ink/10 bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-900 text-lime">
                <Bot size={20} />
              </span>
              <div>
                <p className="kicker text-[11px] text-stone">Next · for AI that touches money</p>
                <p className="mt-2 font-display text-[1.7rem] leading-tight">Harness &amp; Agent OS</p>
                <p className="mt-1 max-w-xl text-[15px] text-ink/70">
                  Policy-bound payments for AI agents: the owner sets the rules, the agent pays within them, ENOS verifies every step.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${site.contactEmail}?subject=ENOS%20partnership`}
              className="group inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-forest-900 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-forest-700 md:self-auto"
            >
              Partner with us
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
