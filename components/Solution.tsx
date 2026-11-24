"use client";

import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownLeft, Check, FileText, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Solution() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotY = useTransform(scrollYProgress, [0, 1], reduce ? [-14, -14] : [-28, 8]);
  const rotX = useTransform(scrollYProgress, [0, 1], reduce ? [8, 8] : [14, 2]);
  const wordX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-18%"]);
  const cardA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -60]);
  const cardB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-mist text-ink">
      {/* Giant background word */}
      <motion.div
        style={{ x: wordX }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(10rem,30vw,30rem)] italic leading-none text-ink/[0.05]"
        aria-hidden
      >
        one account
      </motion.div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="kicker text-stone">The fix</p>
          <h2 className="mt-8 font-display text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.98] tracking-[-0.02em]">
            One account.
            <br />
            USD + USDC.
            <br />
            <em className="text-teal-ink">Plugged into AI.</em>
          </h2>
          <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-ink/75">
            Invoice anyone. Get paid on local rails. Hold dollars. Then run your business on the same AI and SaaS the first
            billion uses — with partner trials and deals built in.
          </p>
          <ul className="mt-10 space-y-4 text-[16px]">
            {["One balance in USD and USDC", "Invoices your clients can actually pay", "AI and SaaS, no card required"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-900 text-lime">
                  <Check size={14} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product shot: a phone in 3D with floating cards */}
        <div className="relative mx-auto h-[640px] w-full max-w-[640px] [perspective:1600px]">
          <div className="absolute bottom-6 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-forest-950/30 blur-2xl" aria-hidden />
          <motion.div
            style={{ rotateY: rotY, rotateX: rotX }}
            className="absolute left-1/2 top-4 h-[590px] w-[290px] -translate-x-1/2 [transform-style:preserve-3d]"
          >
            <Phone />
          </motion.div>

          <motion.div style={{ y: cardA }} className="absolute left-0 top-16 z-10 hidden w-[210px] sm:block lg:-left-10">
            <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_30px_60px_-20px_rgba(0,36,21,0.35)]">
              <div className="flex items-center justify-between">
                <span className="kicker text-[10px] text-stone">Invoice #0142</span>
                <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold text-forest-950">Paid</span>
              </div>
              <p className="mt-3 text-sm text-stone">Studio Lumen · Berlin</p>
              <p className="mt-1 font-display text-3xl">$1,200.00</p>
              <p className="mt-2 text-xs text-stone">Paid by local bank transfer</p>
            </div>
          </motion.div>

          <motion.div style={{ y: cardB }} className="absolute bottom-16 right-0 z-10 hidden w-[220px] sm:block lg:-right-10">
            <div className="rounded-2xl bg-forest-900 p-4 text-white shadow-[0_30px_60px_-20px_rgba(0,36,21,0.6)]">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-lime text-forest-950">
                  <Sparkles size={14} />
                </span>
                <span className="text-sm font-medium">AI &amp; SaaS perks</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-[13px]">
                {[
                  ["AI API credits", "Trial active"],
                  ["Chat assistant · Team", "Unlocked"],
                  ["Design suite", "Unlocked"],
                ].map(([l, r]) => (
                  <li key={l} className="flex justify-between rounded-lg bg-white/[0.06] px-3 py-2">
                    <span className="text-white/80">{l}</span>
                    <span className="text-lime">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Phone() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });
  const [bal, setBal] = useState(47010.55);
  const [toast, setToast] = useState(false);
  const [tap, setTap] = useState(0);

  // Count-up on entry, then a payment lands every few seconds
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, 47010.55, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setBal });
    let landed = false;
    const id = setInterval(() => {
      setToast(true);
      setTap((t) => t + 1);
      if (!landed) {
        animate(47010.55, 48210.55, { duration: 0.9, delay: 0.4, onUpdate: setBal });
        landed = true;
      }
      setTimeout(() => setToast(false), 2200);
    }, 4200);
    return () => {
      c.stop();
      clearInterval(id);
    };
  }, [inView, reduce]);

  const [whole, cents] = bal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split(".");

  return (
    <div ref={ref} className="relative h-full w-full rounded-[46px] bg-gradient-to-b from-[#1c2b24] to-[#0b1410] p-[10px] shadow-[0_60px_100px_-30px_rgba(0,26,15,0.7),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]">
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-forest-950 text-white">
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        {/* Payment toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: -70, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -70, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="absolute left-3 right-3 top-10 z-10 flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 text-ink shadow-xl"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 500, damping: 18 }}
                className="grid h-8 w-8 place-items-center rounded-full bg-lime"
              >
                <Check size={16} strokeWidth={3} />
              </motion.span>
              <span className="flex-1 text-[12px] leading-tight">
                <b className="block font-semibold">Invoice #0142 paid</b>
                <span className="text-stone">Berlin · local transfer</span>
              </span>
              <span className="font-mono text-[12px] font-semibold text-forest-700">+$1,200</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lime/20 blur-3xl" />
        <div className="relative px-5 pt-14">
          <p className="kicker text-[10px] text-white/50">Total balance</p>
          <p className="mt-2 font-display text-[40px] leading-none tabular-nums">
            ${whole}
            <span className="text-white/40">.{cents}</span>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/[0.06] p-3">
              <p className="text-[11px] text-white/50">USD</p>
              <p className="mt-0.5 text-sm font-semibold">$31,480.20</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] p-3">
              <p className="text-[11px] text-white/50">USDC</p>
              <p className="mt-0.5 text-sm font-semibold">16,730.35</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
            <span className="rounded-full bg-lime py-2 text-forest-950">Invoice</span>
            <span className="relative overflow-hidden rounded-full border border-white/15 py-2">
              Pay
              {tap > 0 && (
                <motion.span
                  key={tap}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-1/2 top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-lime"
                />
              )}
            </span>
            <span className="rounded-full border border-white/15 py-2">Convert</span>
          </div>
          <p className="kicker mt-7 text-[10px] text-white/40">Recent</p>
          <ul className="mt-2 space-y-1">
            {[
              [ArrowDownLeft, "Invoice #0142", "+$1,200.00", true],
              [Sparkles, "AI API credits", "−$40.00", false],
              [ArrowDownLeft, "Creator payout", "+850 USDC", true],
              [FileText, "Design SaaS", "−$24.00", false],
            ].map(([Icon, l, a, pos], i) => {
              const I = Icon as typeof Sparkles;
              return (
                <motion.li
                  key={l as string}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2.5 py-2"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.07]">
                    <I size={14} className="text-white/70" />
                  </span>
                  <span className="flex-1 text-[13px]">{l as string}</span>
                  <span className={`font-mono text-[12px] ${pos ? "text-lime" : "text-white/55"}`}>{a as string}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
