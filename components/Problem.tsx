import Reveal from "./Reveal";

const pains = [
  {
    tag: "01 · Getting paid",
    title: "Getting paid is a fight.",
    body: "Clients abroad struggle to pay you. Wires bounce, fees bite, and the money takes days to arrive.",
    bar: "bg-teal",
  },
  {
    tag: "02 · The tools",
    title: "The tools expect a foreign card.",
    body: "AI and SaaS sign-ups ask for a card most Global South founders can't get. So they build the hard way, without them.",
    bar: "bg-amber",
  },
  {
    tag: "03 · Your money",
    title: "Your money is stuck local.",
    body: "Earnings sit in one currency, in one country, with no simple way to hold dollars.",
    bar: "bg-lime",
  },
];

export default function Problem() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="kicker text-stone">The problem</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[1] tracking-[-0.02em]">
            Your customers are global. <em className="text-teal-ink">Your bank isn&apos;t.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08} className="bg-paper">
              <article className="group relative h-full bg-white/60 p-8 transition duration-500 hover:bg-white md:p-10">
                <span className={`absolute left-0 top-0 h-[3px] w-0 ${p.bar} transition-all duration-700 group-hover:w-full`} />
                <p className="kicker text-stone">{p.tag}</p>
                <h3 className="mt-14 font-display text-[2rem] leading-[1.05] tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-4 text-[17px] font-light leading-relaxed text-ink/70">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
