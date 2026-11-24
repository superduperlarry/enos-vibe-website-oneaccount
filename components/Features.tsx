import { Globe2, MapPin, Smartphone, Sparkles, Wallet } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const tools = ["AI APIs", "Chat assistants", "Design suites", "Dev tools", "Ad platforms", "Storefronts", "Video tools", "CRM"];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-white text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-lagoon">Features</p>
            <h2 className="display mt-8 max-w-[15ch] text-[clamp(2.4rem,5vw,4.8rem)] text-deep">
              Everything a Global Business Needs. <em className="text-enos-600">Nothing It Doesn&apos;t.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-lg leading-[1.62] text-ink-2">
              One account replaces the bank branch, the payment apps and the workarounds.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-14 md:grid-cols-6">
          {/* AI tile — marked in Ube Halaya */}
          <Reveal className="md:col-span-4">
            <article className="ground-deep relative h-full overflow-hidden rounded-[32px] p-8 text-white md:p-10">
              <span className="relative grid h-12 w-12 place-items-center rounded-[12px] bg-ube text-white">
                <Sparkles size={20} strokeWidth={1.6} />
              </span>
              <h3 className="display relative mt-8 text-[2.2rem] leading-[1.05]">
                Plug Into <em className="text-chartreuse">AI and SaaS</em>
              </h3>
              <p className="relative mt-3 max-w-lg text-[17px] leading-[1.62] text-white/75">
                Pay for AI APIs, assistants and the rest of your stack straight from your account — starting with partner trials and deals.
              </p>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <li key={t} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Tile className="md:col-span-2" icon={<Smartphone size={24} strokeWidth={1.6} />} title="Open From Your Phone" body="Business onboarding in minutes, not branch visits. One-person companies welcome." proof="60K active merchants on ENOS rails" delay={0.06} />
          <Tile className="md:col-span-2" icon={<Wallet size={24} strokeWidth={1.6} />} title={`USD and ${site.stablecoin}`} body="Hold, send and receive both — from one balance." delay={0.1} />
          <Tile className="md:col-span-2" icon={<Globe2 size={24} strokeWidth={1.6} />} title="Global Rails" body="Invoice anyone. Clients pay with the methods they already use; the money lands in your global account." proof="100+ countries reachable through partners" delay={0.14} />
          <Tile className="md:col-span-2" icon={<MapPin size={24} strokeWidth={1.6} />} title="Local Everywhere" body="QR, mobile wallets and instant bank transfer in every market we connect." proof="Live today · HK · PH · UAE" delay={0.18} />
        </div>
      </div>
    </section>
  );
}

function Tile({
  icon,
  title,
  body,
  proof,
  className,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  proof?: string;
  className?: string;
  delay: number;
}) {
  return (
    <Reveal className={className} delay={delay}>
      <article className="lift flex h-full flex-col rounded-[20px] bg-parchment p-8 md:p-9">
        <span className="text-deep">{icon}</span>
        <h3 className="display mt-7 text-[1.7rem] leading-[1.08] text-deep">{title}</h3>
        <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-ink-2">{body}</p>
        {proof && <p className="mono-label mt-6 border-t border-deep/15 pt-4 text-enos-700">{proof}</p>}
      </article>
    </Reveal>
  );
}
