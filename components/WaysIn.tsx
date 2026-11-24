import Image from "next/image";
import { ArrowRight, Building2, Landmark, Network, Store } from "lucide-react";
import { proof, site } from "@/lib/site";
import eMark from "@/public/enos-e-chartreuse.png";
import Reveal from "./Reveal";

const sales = `mailto:${site.contactEmail}?subject=${encodeURIComponent("ENOS for my business")}`;

const others = [
  { icon: Store, title: "Merchants & SMBs", body: "Collect on every local rail, hold dollars, pay suppliers and staff.", cta: "Open Your Account", href: site.signupUrl },
  { icon: Building2, title: "Enterprises & Traders", body: "Named accounts, multi-rail collection and same-day payouts on hard corridors.", cta: "Talk to Sales", href: sales },
  { icon: Network, title: "PSPs & Platforms", body: "Wholesale rails and one API for every local network we connect.", cta: "Talk to Sales", href: sales },
  { icon: Landmark, title: "SPVs & Deal Vehicles", body: "An account in the vehicle's own name, with pooling and distributions.", cta: "Talk to Sales", href: sales },
];

// Proof from the canonical figures in lib/site.ts: merchants and live markets.
const shown = proof.filter((p) => p.value === "60K" || p.value === "3");

export default function WaysIn() {
  return (
    <section id="who" className="scroll-mt-20 bg-parchment text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow text-lagoon">Our Mission</p>
            <h2 className="display mt-8 max-w-[18ch] text-[clamp(2.4rem,5vw,4.8rem)] text-deep">
              Built for One-Person Companies. <em className="text-enos-600">Ready for Every Business.</em>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-[1.62] text-ink-2">
              The next billion businesses start with one founder and a laptop. We build {site.product} for them first — and the same
              account, the same rails, scale to the largest company on the network.
            </p>
          </Reveal>
          {/* Proof that it already runs at scale */}
          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-6 border-t border-deep/15 pt-6 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {shown.map((p) => (
                <div key={p.label}>
                  <dt className="display text-[clamp(2.4rem,3.4vw,3.2rem)] leading-none text-enos-600">{p.value}</dt>
                  <dd className="mono-label mt-2 leading-relaxed text-ink-2">{p.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <article className="ground-deep relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] p-8 text-white md:p-12">
              <Image src={eMark} alt="" aria-hidden className="pointer-events-none absolute -right-[12%] -top-[22%] h-auto w-[34%]" />
              <div className="relative">
                <p className="eyebrow text-enos-300">Where We Start</p>
                <h3 className="display mt-8 text-[clamp(2.4rem,4vw,3.6rem)] leading-[1]">
                  One-Person <em className="text-chartreuse">Companies</em>
                </h3>
                <p className="mt-4 max-w-sm text-[17px] leading-[1.62] text-white/75">
                  Freelancers, creators, consultants and online sellers who sell to the world and get stuck at the payment.
                </p>
              </div>
              <ul className="relative mt-12 grid gap-3 text-[15px] sm:grid-cols-2">
                {["Open from your phone", "Get paid on local networks", `Hold USD and ${site.stablecoin}`, "AI and SaaS from day one"].map((pt) => (
                  <li key={pt} className="flex items-center gap-3 rounded-[12px] border border-white/12 bg-white/[0.06] px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-chartreuse" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.title} delay={0.06 * (i + 1)}>
                <article className="lift shadow-warm-sm flex h-full flex-col rounded-[20px] bg-white p-7">
                  <o.icon size={24} strokeWidth={1.6} className="text-deep" />
                  <h3 className="display mt-6 text-[1.45rem] leading-tight text-deep">{o.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-2">{o.body}</p>
                  <a href={o.href} className="group mt-5 inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-enos-700 underline-offset-4 hover:underline">
                    {o.cta}
                    <ArrowRight size={15} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
