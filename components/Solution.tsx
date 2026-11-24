"use client";

import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

export default function Solution() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotY = useTransform(scrollYProgress, [0, 1], reduce ? [-12, -12] : [-22, 6]);
  const rotX = useTransform(scrollYProgress, [0, 1], reduce ? [6, 6] : [10, 2]);
  const cardA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -40]);
  const cardB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [100, -70]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white text-ink">
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-lagoon">The Fix</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-deep">
              Get Paid Locally. Hold Dollars. <em className="text-enos-600">Grow With AI.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-[1.62] text-ink-2">
              Invoice anyone. Clients pay on the networks they already use — QR, mobile wallets, instant bank transfer. Hold
              dollars. Then run your business on the same AI and software the first billion uses, with partner trials built in.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-10 space-y-4 text-[16px] text-ink">
              {[`One balance in USD and ${site.stablecoin}`, "Invoices clients can pay locally", "AI and SaaS perks from day one"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-enos-50 text-enos-700">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Product shot: the app, in the product UI palette and Inter */}
        <div className="relative mx-auto h-[640px] w-full max-w-[600px] [perspective:1600px]">
          <div className="absolute bottom-6 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-deep/25 blur-2xl" aria-hidden />
          <motion.div
            style={{ rotateY: rotY, rotateX: rotX }}
            className="absolute left-1/2 top-4 h-[590px] w-[290px] -translate-x-1/2 [transform-style:preserve-3d]"
          >
            <Phone />
          </motion.div>

          <motion.div style={{ y: cardA }} className="absolute left-0 top-16 z-10 hidden w-[214px] font-[family-name:var(--font-ui)] sm:block lg:-left-8">
            <div className="shadow-warm-md rounded-[20px] border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">INV-0142</span>
                <span className="rounded-full bg-enos-50 px-2.5 py-0.5 text-[11px] font-medium text-enos-800">Paid</span>
              </div>
              <p className="mt-3 text-[13px] text-muted">Studio Lumen · Berlin</p>
              <p className="tnum mt-0.5 text-[26px] font-semibold tracking-[-0.02em] text-ink">$1,200.00</p>
              <p className="mt-1 text-[12px] text-muted">Paid by local bank transfer</p>
            </div>
          </motion.div>

          {/* AI is marked in Ube Halaya */}
          <motion.div style={{ y: cardB }} className="absolute bottom-16 right-0 z-10 hidden w-[230px] font-[family-name:var(--font-ui)] sm:block lg:-right-8">
            <div className="shadow-warm-md rounded-[20px] border border-ube/15 bg-ube-tint p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-ube text-white">
                  <Sparkles size={14} strokeWidth={1.8} />
                </span>
                <span className="text-[13px] font-semibold text-ube">AI &amp; SaaS Perks</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-[12.5px]">
                {[
                  ["AI API credits", "Trial active"],
                  ["Chat assistant · Team", "Unlocked"],
                  ["Design suite", "Unlocked"],
                ].map(([l, r]) => (
                  <li key={l} className="flex justify-between rounded-lg bg-white px-3 py-2">
                    <span className="text-ink">{l}</span>
                    <span className="font-medium text-ube">{r}</span>
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

const recent: [typeof Sparkles, string, string, boolean][] = [
  [ArrowDownLeft, "Invoice INV-0142", "+$1,200.00", true],
  [ArrowUpRight, "AI API credits", "−$40.00", false],
  [ArrowDownLeft, "Creator payout", "", true],
  [ArrowUpRight, "Design SaaS", "−$24.00", false],
];

function Phone() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [bal, setBal] = useState(48210.55);
  const [toast, setToast] = useState(false);

  // Plays once on entry: count up, then the payment lands.
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, 47010.55, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setBal });
    const t1 = setTimeout(() => {
      setToast(true);
      animate(47010.55, 48210.55, { duration: 0.8, delay: 0.3, onUpdate: setBal });
    }, 1900);
    const t2 = setTimeout(() => setToast(false), 4600);
    return () => {
      c.stop();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduce]);

  const [whole, cents] = bal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split(".");

  return (
    <div ref={ref} className="shadow-warm-lg relative h-full w-full rounded-[46px] bg-ink p-[10px] font-[family-name:var(--font-ui)]">
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-page text-ink">
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: -70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -70, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="shadow-warm-md absolute left-3 right-3 top-10 z-10 flex items-center gap-2.5 rounded-2xl bg-white p-2.5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-enos-700 text-white">
                <Check size={16} strokeWidth={2.4} />
              </span>
              <span className="flex-1 text-[12px] leading-tight">
                <b className="block font-semibold">Payment received</b>
                <span className="text-muted">Berlin · local transfer</span>
              </span>
              <span className="tnum text-[12px] font-semibold text-enos-700">+$1,200</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white px-5 pb-5 pt-14">
          <p className="text-[12px] font-medium text-muted">Total balance</p>
          <p className="tnum mt-1 text-[34px] font-semibold leading-none tracking-[-0.02em]">
            ${whole}
            <span className="text-muted">.{cents}</span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-line p-3">
              <p className="text-[11px] text-muted">USD</p>
              <p className="tnum mt-0.5 text-sm font-semibold">$31,480.20</p>
            </div>
            <div className="rounded-2xl border border-line p-3">
              <p className="text-[11px] text-muted">{site.stablecoin}</p>
              <p className="tnum mt-0.5 text-sm font-semibold">16,730.35</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px] font-medium">
            <span className="rounded-full bg-enos-600 py-2 text-white">Invoice</span>
            <span className="rounded-full border border-line py-2">Pay</span>
            <span className="rounded-full border border-line py-2">Convert</span>
          </div>
        </div>

        <div className="px-5 pt-5">
          <p className="text-[12px] font-medium text-muted">Recent</p>
          <ul className="mt-2 space-y-1">
            {recent.map(([I, l, a, pos], i) => (
              <motion.li
                key={l}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 py-2"
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full ${pos ? "bg-enos-50 text-enos-700" : "bg-white text-ink-2"}`}>
                  <I size={14} strokeWidth={1.8} />
                </span>
                <span className="flex-1 text-[13px]">{l}</span>
                <span className={`tnum text-[12.5px] font-medium ${pos ? "text-enos-700" : "text-ink"}`}>
                  {a || `+850 ${site.stablecoin}`}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
