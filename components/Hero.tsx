"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { proof, site } from "@/lib/site";
import eMark from "@/public/enos-e-chartreuse.png";
import Slash from "./Slash";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const eY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="top" ref={ref} className="ground-deep grain relative overflow-hidden text-white">
      {/* Brand device: the stylized e, cropped and anchored to the top-right edge, vertex showing */}
      {site.heroVisual === "e" ? (
        <motion.div
          style={{ y: eY }}
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease }}
          className="pointer-events-none absolute -right-[30%] top-[10%] hidden w-[80%] opacity-90 sm:block sm:-right-[18%] sm:w-[56%] lg:-right-[9%] lg:top-[12%] lg:w-[40%]"
          aria-hidden
        >
          <Image src={eMark} alt="" priority className="h-auto w-full" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 md:left-[40%]" aria-hidden>
          <Globe className="h-full w-full" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(10,42,33,.85)_0%,rgba(10,42,33,.55)_45%,transparent_75%)] lg:w-[70%]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-12 pt-36 md:px-10 md:pb-14 md:pt-48">
        <motion.p {...rise(0.1)} className="eyebrow text-enos-300">
          {site.product} · {site.categoryLine}
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="display mt-8 max-w-[16ch] text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.98] text-white"
        >
          One Account.
          <br />
          The Whole <em className="text-chartreuse">Internet Economy.</em>
        </motion.h1>

        <motion.p {...rise(0.32)} className="mt-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          The dollar account for one-person companies — and every business in the Global South. Get paid on local networks,
          hold USD and {site.stablecoin}, and pay for the AI and software you grow on.
        </motion.p>

        <motion.div {...rise(0.42)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={site.signupUrl}
            className="press group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-chartreuse px-7 py-4 text-[15px] font-semibold text-deep-900 hover:bg-white"
          >
            Open Your Account
            <ArrowRight size={18} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="press inline-flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-white/40 px-7 py-4 text-[15px] font-semibold text-white hover:border-white"
          >
            See How It Works
          </a>
        </motion.div>

        {/* The slash as an arrow: money moving */}
        <motion.p {...rise(0.52)} className="mt-14 flex flex-wrap items-center gap-3 font-mono text-[15px] text-white/85 md:text-lg">
          Gets you paid from Manila
          <Slash className="h-6 w-16 text-chartreuse md:h-7 md:w-20" />
          to anywhere.
        </motion.p>

        {/* Stats ride a rule beneath, per the web-header pattern */}
        <motion.div {...rise(0.6)} className="mt-14 grid grid-cols-2 gap-y-8 border-t border-white/[0.14] pt-8 md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label} className="pr-4">
              <p className="display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-chartreuse">{p.value}</p>
              <p className="mono-label mt-3 leading-relaxed text-white/60">{p.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
