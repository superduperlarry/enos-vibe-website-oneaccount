"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

// Illustrative activity — not real customer data.
const feed = [
  { icon: ArrowDownLeft, from: "Manila", to: "San Francisco client", amount: "+$1,200.00", note: "Invoice paid · local rail" },
  { icon: Sparkles, from: "Lagos", to: "AI API credits", amount: "−$40.00", note: "Auto-pay · subscription" },
  { icon: ArrowDownLeft, from: "Jakarta", to: "Platform payout", amount: `+850.00 ${site.stablecoin}`, note: "Creator earnings" },
  { icon: ArrowDownLeft, from: "Karachi", to: "Dubai buyer", amount: "+$3,400.00", note: "Invoice paid · local rail" },
  { icon: Sparkles, from: "Nairobi", to: "Design SaaS", amount: "−$24.00", note: "Trial → paid" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <section id="top" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-forest-950">
      {/* Glow + globe */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[-20%] top-[-10%] h-[120%] w-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(225,255,51,0.16),rgba(0,51,30,0.35)_55%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-x-[-30%] top-[40px] h-[420px] md:inset-x-auto md:left-[42%] md:right-[-22%] lg:left-[33%] lg:right-[-12%] md:top-[2%] md:bottom-[-2%] md:h-auto"
      >
        <Globe className="h-full w-full" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-forest-950 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[78%] bg-[linear-gradient(90deg,rgba(0,26,15,.92)_0%,rgba(0,26,15,.75)_45%,transparent_100%)] md:block lg:w-[62%]" aria-hidden />

      {/* Copy */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1400px] px-6 pb-14 pt-[420px] md:px-10 md:pb-20 md:pt-40">
        <motion.p {...fade(0.2)} className="kicker flex items-center gap-3 text-lime">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {site.product} · {site.categoryLine}
        </motion.p>

        <motion.h1
          {...fade(0.35)}
          className="mt-7 max-w-[15ch] font-display text-[clamp(3.1rem,8.4vw,9rem)] font-normal leading-[0.92] tracking-[-0.025em] text-white"
        >
          One account.
          <br />
          The whole <em className="text-lime">internet economy.</em>
        </motion.h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p {...fade(0.55)} className="max-w-xl text-lg font-light leading-relaxed text-white/75 md:text-xl">
              The dollar account for one-person companies — and every business in the Global South. Get paid on local networks, hold USD and {site.stablecoin}, and pay for the AI and software you grow on.
            </motion.p>
            <motion.div {...fade(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.signupUrl}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-lime px-7 py-4 text-[15px] font-semibold text-forest-950 shadow-[0_0_40px_-6px_rgba(225,255,51,0.6)] transition hover:bg-white"
              >
                Open your account
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-7 py-4 text-[15px] font-medium text-white/90 backdrop-blur-sm transition hover:border-white/50"
              >
                See how it works
              </a>
              <span className="mt-2 max-w-[17rem] text-sm font-light leading-snug text-white/55 sm:ml-4 sm:mt-0">Your business doesn&apos;t need a local bank ID. <span className="text-lime">ENOS does.</span></span>
            </motion.div>
          </div>
          <motion.div {...fade(0.9)} className="hidden lg:block">
            <LiveFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LiveFeed() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((x) => (x + 1) % feed.length), 2800);
    return () => clearInterval(id);
  }, [reduce]);
  const item = feed[i];
  return (
    <div className="w-[340px] rounded-2xl border border-white/10 bg-forest-900/60 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="kicker text-[10px] text-white/45">Live on ENOS</span>
        <span className="kicker text-[10px] text-white/30">Illustrative</span>
      </div>
      <div className="relative h-[52px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0 flex items-center gap-3"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
              <item.icon size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">
                {item.from} → {item.to}
              </span>
              <span className="block truncate text-xs text-white/50">{item.note}</span>
            </span>
            <span className="shrink-0 font-mono text-sm text-lime">{item.amount}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
