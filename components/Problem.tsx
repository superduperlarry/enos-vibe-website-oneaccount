import { Globe, KeyRound, Wallet } from "lucide-react";
import Reveal from "./Reveal";

const pains = [
  {
    icon: Globe,
    title: "Getting Paid Is a Fight",
    body: "Clients abroad struggle to pay you. Wires bounce, fees bite, and the money takes days to arrive.",
  },
  {
    icon: KeyRound,
    title: "The Tools Expect a Foreign Card",
    body: "AI and SaaS sign-ups ask for a card most Global South founders can't get. So they build the hard way, without them.",
  },
  {
    icon: Wallet,
    title: "Your Money Is Stuck Local",
    body: "Earnings sit in one currency, in one country, with no simple way to hold dollars.",
  },
];

export default function Problem() {
  return (
    <section className="bg-parchment text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow text-lagoon">The Problem</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-8 max-w-[16ch] text-[clamp(2.4rem,5vw,4.8rem)] text-deep">
            Your Customers Are Global. <em className="text-enos-600">Your Bank Isn&apos;t.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={0.08 + i * 0.06}>
              <article className="lift shadow-warm-sm h-full rounded-[20px] bg-white p-8 md:p-10">
                <p.icon size={26} strokeWidth={1.6} className="text-deep" />
                <h3 className="display mt-10 text-[1.6rem] leading-[1.1] text-deep">{p.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.62] text-ink-2">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
