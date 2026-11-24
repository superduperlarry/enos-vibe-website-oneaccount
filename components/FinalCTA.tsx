import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import eMark from "@/public/enos-e-chartreuse.png";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section id="get-started" className="ground-deep grain relative overflow-hidden text-white">
      {/* Cropped e anchored to the bottom-right edge, vertex showing */}
      <Image
        src={eMark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[24%] h-auto w-[66%] opacity-90 md:-bottom-[18%] md:-right-[10%] md:w-[40%]"
      />
      <div className="relative mx-auto max-w-[1320px] px-6 pb-72 pt-28 md:px-10 md:py-44">
        <Reveal>
          <p className="eyebrow text-enos-300">Get Started</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mt-8 max-w-[15ch] text-[clamp(2.8rem,6.4vw,6.4rem)] leading-[0.98]">
            AI Is Eating the World. We Make Sure the World Can <em className="text-chartreuse">Pay for It.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center">
            <a
              href={site.signupUrl}
              className="press group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-chartreuse px-8 py-4 text-[15px] font-semibold text-deep-900 hover:bg-white"
            >
              Open Your Account
              <ArrowRight size={18} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] uppercase tracking-[0.18em] text-enos-300">
              <span className="whitespace-nowrap">One Founder</span>
              <i className="h-[5px] w-[5px] rounded-full bg-white/40" />
              <span className="whitespace-nowrap">Every Business</span>
              <i className="h-[5px] w-[5px] rounded-full bg-white/40" />
              <span className="whitespace-nowrap">One Account</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
