import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import eMark from "@/public/enos-e-white.png";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section id="get-started" className="grain relative overflow-hidden bg-forest-950">
      <Image
        src={eMark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.06]"
      />
      <div className="absolute left-[10%] top-1/2 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-lime/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        <Reveal>
          <p className="kicker text-lime">Get started</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[16ch] font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] tracking-[-0.025em] text-white">
            AI is eating the world. We make sure the world can <em className="text-lime">pay for it.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
            <a
              href={site.signupUrl}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-8 py-4 text-[15px] font-semibold text-forest-950 shadow-[0_0_50px_-8px_rgba(225,255,51,0.7)] transition hover:bg-white"
            >
              Open your account
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <span className="kicker text-white/50">One founder · Every business · One account</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
