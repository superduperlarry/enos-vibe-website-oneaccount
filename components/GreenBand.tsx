import Reveal from "./Reveal";

/** A full ENOS Green moment: one message, Ink text, no charts. Its own sub-headline, set heavier than the section heads. */
export default function GreenBand() {
  return (
    <section className="bg-enos text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <h2 className="display display-heavy max-w-[20ch] text-[clamp(2.3rem,5.2vw,4.9rem)]">
            Your Business Doesn&apos;t Need a Local Bank ID. <em className="mt-1 block md:mt-2">ENOS Does.</em>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
