import { Globe2, MapPin, Plug, Smartphone, Wallet } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const tools = ["AI APIs", "Chat assistants", "Design suites", "Dev tools", "Ad platforms", "Storefronts", "Video tools", "CRM"];

export default function Features() {
  return (
    <section id="features" className="grain relative scroll-mt-20 overflow-hidden bg-forest-900 text-white">
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="kicker text-lime">Features</p>
            <h2 className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1] tracking-[-0.02em]">
              Everything a global business needs. <em className="text-lime">Nothing it doesn&apos;t.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-lg font-light text-white/65">
              One account replaces the bank branch, the payment apps and the workarounds.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-6">
          {/* Wide hero tile */}
          <Reveal className="md:col-span-4">
            <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-forest-800 p-8 md:p-10">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime/15 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
              <Icon><Plug size={20} /></Icon>
              <h3 className="relative mt-10 font-display text-[2.2rem] leading-[1.05]">Plug into AI and SaaS</h3>
              <p className="relative mt-3 max-w-lg text-[17px] font-light leading-relaxed text-white/70">
                Pay for AI APIs, assistants and the rest of your stack straight from your account — starting with partner trials and deals.
              </p>
              <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
                <div className="marquee flex w-max gap-3" style={{ ["--marquee-speed" as string]: "28s" }}>
                  {[...tools, ...tools].map((t, i) => (
                    <span key={i} className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Tile className="md:col-span-2" icon={<Smartphone size={20} />} title="Open from your phone" body="Business onboarding in minutes, not branch visits. One-person companies welcome." delay={0.06} />
          <Tile className="md:col-span-2" icon={<Wallet size={20} />} title={`USD and ${site.stablecoin}`} body="Hold, send and receive both — from one balance." delay={0.1} />
          <Tile className="md:col-span-2" icon={<Globe2 size={20} />} title="Global rails" body="Invoice anyone. Clients pay with the methods they already use; the money lands in your global account." delay={0.14} />
          <Reveal className="md:col-span-2" delay={0.18}>
            <article className="flex h-full flex-col justify-between rounded-3xl bg-lime p-8 text-forest-950 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-950 text-lime">
                <MapPin size={20} />
              </span>
              <div>
                <h3 className="mt-10 font-display text-[2.2rem] leading-[1.05]">Local everywhere</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-forest-950/75">Your business doesn&apos;t need a local bank ID. ENOS does.</p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-lime text-forest-950">{children}</span>;
}

function Tile({ icon, title, body, className, delay }: { icon: React.ReactNode; title: string; body: string; className?: string; delay: number }) {
  return (
    <Reveal className={className} delay={delay}>
      <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.06] md:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 text-lime">{icon}</span>
        <h3 className="mt-10 font-display text-[1.9rem] leading-[1.05]">{title}</h3>
        <p className="mt-3 text-[16px] font-light leading-relaxed text-white/65">{body}</p>
      </article>
    </Reveal>
  );
}
