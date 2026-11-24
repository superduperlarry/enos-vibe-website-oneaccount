"use client";

import { animate, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { calculator, site } from "@/lib/site";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

const usd = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

/** What cross-border fees cost a visitor in a year, on their own assumptions. Never an ENOS quote. */
export default function Savings() {
  const [monthly, setMonthly] = useState(calculator.monthly);
  const [payments, setPayments] = useState(calculator.paymentsPerMonth);
  const [wireFee, setWireFee] = useState(calculator.wireFee);
  const [spread, setSpread] = useState(calculator.fxSpread);

  const lostYear = 12 * (payments * wireFee + (monthly * spread) / 100);
  const share = monthly > 0 ? (lostYear / (monthly * 12)) * 100 : 0;
  const enos = calculator.enosFeePct;
  const enosYear = enos == null ? null : (12 * monthly * enos) / 100;

  return (
    <section id="savings" className="bg-parchment text-ink">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-lagoon">Do the Maths</p>
          <h2 className="display mt-8 max-w-[14ch] text-[clamp(2.4rem,5vw,4.8rem)] text-deep">
            What Is Getting Paid <em className="text-enos-600">Costing You?</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-[1.62] text-ink-2">
            Wire fees and FX spreads are easy to miss one payment at a time. Add them up over a year and they come to real money. Set the
            numbers to match how you get paid today.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="shadow-warm-lg overflow-hidden rounded-[28px] bg-white">
            <div className="grid gap-6 p-6 md:p-9">
              <Slider id="calc-monthly" label="You get paid from abroad" value={monthly} onChange={setMonthly} min={200} max={20000} step={100} format={(v) => `${usd(v)} a month`} />
              <Slider id="calc-payments" label="In this many payments" value={payments} onChange={setPayments} min={1} max={30} step={1} format={(v) => `${v} a month`} />
              <div className="grid gap-6 sm:grid-cols-2">
                <Slider id="calc-fee" label="Fee per payment" value={wireFee} onChange={setWireFee} min={0} max={60} step={1} format={(v) => usd(v)} />
                <Slider id="calc-spread" label="FX spread" value={spread} onChange={setSpread} min={0} max={8} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Illustrative: example assumptions, not quotes. Change them to match your bank or payment app. Calculated as 12 × (payments ×
                fee + FX spread × amount).
              </p>
            </div>

            <div className="ground-deep p-6 text-white md:p-9" aria-live="polite">
              <p className="mono-label text-[10px] text-white/70">Lost to fees and FX every year</p>
              <p className="display tnum mt-3 text-[clamp(3rem,7vw,5rem)] leading-none text-chartreuse">
                <CountUp value={lostYear} />
              </p>
              <p className="mt-3 text-white/75">That&apos;s {share.toFixed(1)}% of everything your clients pay you.</p>

              <div className="mt-7 border-t border-white/10 pt-6">
                {enosYear == null ? (
                  <p className="text-[13px] text-white/70">
                    <Placeholder tone="dark">[ENOS fee comparison — to be confirmed]</Placeholder>
                  </p>
                ) : (
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="mono-label text-[10px] text-white/70">
                        On {site.product} at {enos}%
                      </p>
                      <p className="display tnum mt-2 text-3xl">{usd(enosYear)} a year</p>
                    </div>
                    <p className="display tnum text-3xl text-chartreuse">Keep {usd(Math.max(0, lostYear - enosYear))}</p>
                  </div>
                )}
                <a
                  href={site.signupUrl}
                  className="press group mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-chartreuse px-7 py-4 text-[15px] font-semibold text-deep-900 hover:bg-white"
                >
                  Open Your Account
                  <ArrowRight size={18} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] text-ink-2">
          {label}
        </label>
        <span className="tnum whitespace-nowrap font-mono text-[15px] font-medium text-ink">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduce) {
      setShown(value);
      from.current = value;
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setShown(v);
        from.current = v;
      },
    });
    return () => c.stop();
  }, [value, reduce]);
  return <>{usd(shown)}</>;
}
