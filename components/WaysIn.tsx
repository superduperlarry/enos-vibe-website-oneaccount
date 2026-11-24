import Image from "next/image";
import { ArrowUpRight, Building2, Landmark, Network, Sparkles, Store } from "lucide-react";
import { site } from "@/lib/site";
import eMark from "@/public/enos-e-chartreuse.png";
import Reveal from "./Reveal";

const others = [
  { icon: Store, title: "Merchants & SMBs", body: "Collect on every local rail, hold dollars, pay suppliers and staff." },
  { icon: Building2, title: "Enterprises & Traders", body: "Named accounts, multi-rail collection and same-day payouts on hard corridors." },
  { icon: Network, title: "PSPs & Platforms", body: "Wholesale rails and one API for every local network we connect." },
  { icon: Landmark, title: "SPVs & Deal Vehicles", body: "An account in the vehicle's own name, with pooling and distributions." },
];

export default function WaysIn() {
  return (
    <section id="who" className="scroll-mt-20 bg-parchment text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
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

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.1fr_1fr]">
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
                <article className="lift shadow-warm-sm h-full rounded-[20px] bg-white p-7">
                  <o.icon size={24} strokeWidth={1.6} className="text-deep" />
                  <h3 className="display mt-6 text-[1.45rem] leading-tight text-deep">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{o.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* AI → Ube Halaya */}
        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-6 rounded-[20px] border border-ube/15 bg-ube-tint p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-ube text-white">
                <Sparkles size={20} strokeWidth={1.6} />
              </span>
              <div>
                <p className="mono-label text-ube">Next · For AI That Touches Money</p>
                <p className="display mt-2 text-[1.7rem] leading-tight text-ink">Harness &amp; Agent OS</p>
                <p className="mt-1 max-w-xl text-[15px] text-ink-2">
                  Policy-bound payments for AI agents: the owner sets the rules, the agent pays within them, ENOS verifies every step.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${site.contactEmail}?subject=ENOS%20partnership`}
              className="press group inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-deep-800 md:self-auto"
            >
              Partner With Us
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
