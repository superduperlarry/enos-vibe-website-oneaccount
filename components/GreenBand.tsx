import Reveal from "./Reveal";

/** A full ENOS Green moment: one message, Ink text, no charts. */
export default function GreenBand() {
  return (
    <section className="bg-enos text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="display max-w-[22ch] text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.02]">
            Your Business Doesn&apos;t Need a Local Bank ID. <em>ENOS Does.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
