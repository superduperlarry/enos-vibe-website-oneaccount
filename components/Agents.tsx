"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, RotateCcw, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const LIMIT = 200;

type Entry = { id: number; label: string; amount: number; ok: boolean; reason: string };

/** Harness & Agent OS: an illustrative demo of an AI agent paying within its owner's rule. AI is marked in Ube Halaya. */
export default function Agents() {
  const reduce = useReducedMotion();
  const [spent, setSpent] = useState(0);
  const [log, setLog] = useState<Entry[]>([]);

  function request(label: string, amount: number) {
    const ok = spent + amount <= LIMIT;
    const reason = ok
      ? `Within the rule · $${spent + amount} of $${LIMIT} used this month`
      : `Blocked · would take the month to $${spent + amount}, over the $${LIMIT} rule`;
    if (ok) setSpent(spent + amount);
    setLog((l) => [{ id: Date.now(), label, amount, ok, reason }, ...l].slice(0, 3));
  }

  function reset() {
    setSpent(0);
    setLog([]);
  }

  return (
    <section id="agents" className="ground-deep grain relative overflow-hidden text-white">
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-enos-300">Next · For AI That Touches Money</p>
          <h2 className="display mt-8 max-w-[15ch] text-[clamp(2.4rem,5vw,4.8rem)]">
            Your AI Agents Can Pay. <em className="text-chartreuse">Only Within Your Rules.</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-[1.62] text-white/80">
            Harness &amp; Agent OS: policy-bound payments for AI agents. The owner sets the rules, the agent pays within them, ENOS verifies
            every step.
          </p>
          <a
            href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Harness & Agent OS partnership")}`}
            className="press group mt-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-chartreuse px-7 py-4 text-[15px] font-semibold text-deep-900 hover:bg-white"
          >
            Partner With Us
            <ArrowUpRight size={18} strokeWidth={1.8} className="transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[28px] border border-white/12 bg-deep-900/70 p-6 font-[family-name:var(--font-ui)] backdrop-blur md:p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label text-[10px] text-white/70">Try it</span>
              <span className="mono-label text-[10px] text-white/60">Illustrative demo</span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-chartreuse text-deep-900">
                  <ShieldCheck size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-white/65">Owner&apos;s rule</p>
                  <p className="font-medium">AI APIs · up to ${LIMIT} a month</p>
                </div>
                <span className="tnum font-mono text-sm text-chartreuse">
                  ${spent} / ${LIMIT}
                </span>
              </div>
              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Spent against the rule"
                aria-valuemin={0}
                aria-valuemax={LIMIT}
                aria-valuenow={spent}
              >
                <motion.div className="h-full rounded-full bg-chartreuse" animate={{ width: `${(spent / LIMIT) * 100}%` }} transition={{ duration: reduce ? 0 : 0.5 }} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Agent buys AI API credits", 40, "$40 · API credits"],
                ["Agent tries a GPU rental", 500, "$500 · GPU rental"],
              ].map(([label, amount, text]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => request(label as string, amount as number)}
                  className="press flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-left text-[14px] hover:border-chartreuse hover:bg-white/[0.08]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ube text-white">
                    <Sparkles size={15} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-white/65">Agent asks to pay</span>
                    <span className="font-medium">{text}</span>
                  </span>
                </button>
              ))}
            </div>

            <ul className="mt-5 min-h-[188px] space-y-2" aria-live="polite">
              {log.length === 0 && (
                <li className="grid h-[188px] place-items-center rounded-2xl border border-dashed border-white/15 px-4 text-center text-sm text-white/60">
                  Press a request to see ENOS check it against the rule.
                </li>
              )}
              <AnimatePresence initial={false}>
                {log.map((e) => (
                  <motion.li
                    key={e.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: -16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${e.ok ? "bg-chartreuse/10" : "bg-saffron/15"}`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-deep-900 ${e.ok ? "bg-chartreuse" : "bg-saffron"}`}>
                      {e.ok ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium">{e.label}</span>
                      <span className={`block text-[12px] ${e.ok ? "text-white/70" : "text-saffron"}`}>{e.reason}</span>
                    </span>
                    <span className={`tnum font-mono text-[13px] ${e.ok ? "text-chartreuse" : "text-white/55 line-through"}`}>−${e.amount}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {log.length > 0 && (
              <button type="button" onClick={reset} className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-chartreuse">
                <RotateCcw size={14} /> Start the month again
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
