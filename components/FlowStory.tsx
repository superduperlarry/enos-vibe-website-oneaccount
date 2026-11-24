"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Bot, Brush, Clapperboard, Code2, Megaphone, MessagesSquare } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Pinned scroll story: money moves into one account, then out into AI tools, then the business grows.
 * All figures are illustrative.
 */

const steps = [
  {
    n: "01",
    title: "Get Paid",
    accent: "From Anywhere.",
    body: "Send an invoice. Clients pay on the local networks they already use — QR, mobile wallet, instant bank transfer. Your business doesn't need a local bank ID. ENOS does.",
  },
  {
    n: "02",
    title: "Hold",
    accent: "in Dollars.",
    body: `Everything lands in ${site.product}, in USD or ${site.stablecoin}. No more earnings stuck in one currency, in one country.`,
  },
  {
    n: "03",
    title: "Plug In",
    accent: "AI and SaaS.",
    body: "Pay for the AI APIs, assistants and software the first billion uses — straight from your account, with partner trials to start.",
  },
  {
    n: "04",
    title: "Grow",
    accent: "on Your Terms.",
    body: "As you grow, ENOS runs your subscriptions — then cards, credit and treasury for qualified businesses. Same account from one founder to a full team.",
  },
];

const invoices = [
  { city: "Lagos", rail: "Bank transfer", amount: "+$3,400", from: [-330, -210] as const, mid: [-200, -170] as const },
  { city: "Manila", rail: "Mobile wallet", amount: "+$1,200", from: [-360, 40] as const, mid: [-220, 10] as const },
  { city: "Karachi", rail: "QR payment", amount: "+$2,150", from: [-300, 230] as const, mid: [-190, 170] as const },
  { city: "São Paulo", rail: "Instant transfer", amount: "+$5,730", from: [330, -220] as const, mid: [210, -170] as const },
];

const tools = [
  { icon: Bot, label: "AI APIs", pos: [-235, -150] as const },
  { icon: MessagesSquare, label: "Assistants", pos: [0, -205] as const },
  { icon: Brush, label: "Design", pos: [235, -150] as const },
  { icon: Code2, label: "Dev tools", pos: [-235, 150] as const },
  { icon: Clapperboard, label: "Video", pos: [0, 205] as const },
  { icon: Megaphone, label: "Ads", pos: [235, 150] as const },
];

const money = (v: number) => "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FlowStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = scrollYProgress;

  const [step, setStep] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStep(Math.min(3, Math.max(0, Math.floor(v * 4.0001)))));

  // Balance counts up as invoices land
  const balance = useTransform(p, [0.04, 0.24], [0, 12480.55], { clamp: true });
  const balanceText = useTransform(balance, money);
  const usdPct = useTransform(p, [0.28, 0.45], ["0%", "63%"]);
  const usdcPct = useTransform(p, [0.3, 0.47], ["0%", "37%"]);
  const holdOpacity = useTransform(p, [0.27, 0.33], [0, 1]);

  // Growth
  const revenue = useTransform(p, [0.76, 0.96], [1200, 18400], { clamp: true });
  const revenueText = useTransform(revenue, (v) => "$" + (v / 1000).toFixed(1) + "k");
  const chartDraw = useTransform(p, [0.76, 0.96], [0, 1]);
  const chartOpacity = useTransform(p, [0.74, 0.78], [0, 1]);
  const cardGlow = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [0.25, 0.55, 0.45, 0.6, 0.9]);
  const toolsDim = useTransform(p, [0.76, 0.86], [1, 0.35]);
  const cardShadow = useTransform(cardGlow, (g) => `0 0 ${60 + g * 80}px -10px rgba(0,169,79,${g * 0.55}), inset 0 1px 0 rgba(255,255,255,0.12)`);
  const badges = useTransform(p, [0.86, 0.92], [0, 1]);

  return (
    <section id="how" ref={ref} className="ground-deep relative h-[420vh] scroll-mt-0">
      <div className="grain sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] gap-6 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Copy */}
          <div className="relative z-10 pt-20 lg:pt-0">
            <p className="eyebrow text-enos-300">How It Works</p>
            <div className="mt-5 flex gap-2" aria-hidden>
              {steps.map((s, i) => (
                <StepBar key={s.n} p={p} i={i} />
              ))}
            </div>
            <div className="relative mt-6 min-h-[200px] md:mt-10 md:min-h-[300px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -24, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-sm text-white/40">{steps[step].n} / 04</p>
                  <h2 className="display mt-3 text-[clamp(2.4rem,5.2vw,5.2rem)] leading-[1] text-white">
                    {steps[step].title} <em className="text-chartreuse">{steps[step].accent}</em>
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/70 md:text-lg">{steps[step].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scene: designed at 720x600, scaled to fit */}
          <div className="relative mx-auto h-[330px] w-full sm:h-[440px] lg:h-[600px]">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[720px] -translate-x-1/2 -translate-y-1/2 scale-[0.5] sm:scale-[0.7] lg:scale-100">
              {/* Growth chart behind the card */}
              <motion.svg
                style={{ opacity: chartOpacity }}
                viewBox="0 0 720 600"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00A94F" stopOpacity="0.30" />
                    <stop offset="1" stopColor="#00A94F" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M20 540 C 140 530, 200 500, 280 470 S 420 400, 480 330 S 610 150, 700 70 L 700 600 L 20 600 Z"
                  fill="url(#gfill)"
                  style={{ opacity: chartDraw }}
                />
                <motion.path
                  d="M20 540 C 140 530, 200 500, 280 470 S 420 400, 480 330 S 610 150, 700 70"
                  fill="none"
                  stroke="#00A94F"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: chartDraw }}
                />
              </motion.svg>

              {/* Flight paths for invoices */}
              <svg viewBox="-360 -300 720 600" className="absolute inset-0 h-full w-full" aria-hidden>
                {invoices.map((inv, i) => (
                  <FlightPath key={inv.city} p={p} i={i} from={inv.from} mid={inv.mid} />
                ))}
                {tools.map((t, i) => (
                  <ToolLine key={t.label} p={p} i={i} pos={t.pos} />
                ))}
              </svg>

              {/* Tools */}
              {tools.map((t, i) => (
                <ToolTile key={t.label} p={p} i={i} tool={t} dim={toolsDim} />
              ))}

              {/* The account card */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-20 w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-white/15 bg-mineral p-6 font-[family-name:var(--font-ui)] text-white"
                style={{ boxShadow: cardShadow }}
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px] text-white/60">{site.product}</span>
                  <span className="h-2 w-2 rounded-full bg-enos" />
                </div>
                <motion.p className="tnum mt-4 text-[40px] font-semibold leading-none tracking-[-0.02em]">{balanceText}</motion.p>
                <p className="mt-2 text-xs text-white/45">Paid from 4 countries · local rails</p>
                <motion.div style={{ opacity: holdOpacity }} className="mt-5 space-y-2.5">
                  <Bar label="USD" value="$7,863" width={usdPct} />
                  <Bar label={site.stablecoin} value="4,617" width={usdcPct} />
                </motion.div>
                <motion.div style={{ opacity: chartOpacity }} className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <span className="mono-label text-[10px] text-white/60">Monthly revenue</span>
                  <motion.span className="display text-[28px] text-chartreuse">{revenueText}</motion.span>
                </motion.div>
              </motion.div>

              {/* Invoices */}
              {invoices.map((inv, i) => (
                <InvoiceChip key={inv.city} p={p} i={i} inv={inv} />
              ))}

              {/* Unlock badges */}
              <motion.div style={{ opacity: badges }} className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                {["Cards", "Credit", "Treasury"].map((b) => (
                  <span key={b} className="whitespace-nowrap rounded-full border border-saffron/70 bg-deep-900/85 px-4 py-2 text-sm text-saffron backdrop-blur">
                    {b} · next
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <p className="mono-label absolute bottom-5 right-6 text-[10px] text-white/35 md:right-10">Illustrative figures</p>
      </div>
    </section>
  );
}

function StepBar({ p, i }: { p: MotionValue<number>; i: number }) {
  const width = useTransform(p, [i / 4, (i + 1) / 4], ["0%", "100%"]);
  return (
    <span className="h-[3px] w-10 overflow-hidden rounded-full bg-white/15 md:w-14">
      <motion.span className="block h-full bg-enos" style={{ width }} />
    </span>
  );
}

function Bar({ label, value, width }: { label: string; value: string; width: MotionValue<string> }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="font-semibold text-white/80">{label}</span>
        <span className="font-mono text-white/55">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-enos" style={{ width }} />
      </div>
    </div>
  );
}

const win = (i: number) => {
  const s = 0.03 + i * 0.045;
  return [s, s + 0.06, s + 0.11] as const; // start, mid, land
};

function FlightPath({ p, i, from, mid }: { p: MotionValue<number>; i: number; from: readonly [number, number]; mid: readonly [number, number] }) {
  const [s, , e] = win(i);
  const draw = useTransform(p, [s, e], [0, 1]);
  const op = useTransform(p, [s, s + 0.02, 0.3, 0.36], [0, 0.6, 0.6, 0]);
  return (
    <motion.path
      d={`M ${from[0]} ${from[1]} Q ${mid[0]} ${mid[1]} 0 0`}
      fill="none"
      stroke="#D8FF32"
      strokeWidth="1.5"
      strokeDasharray="4 6"
      style={{ pathLength: draw, opacity: op }}
    />
  );
}

function InvoiceChip({ p, i, inv }: { p: MotionValue<number>; i: number; inv: (typeof invoices)[number] }) {
  const [s, m, e] = win(i);
  const x = useTransform(p, [s, m, e], [inv.from[0], inv.mid[0], 0]);
  const y = useTransform(p, [s, m, e], [inv.from[1], inv.mid[1], 0]);
  const scale = useTransform(p, [s, m, e], [0.9, 1, 0.3]);
  const opacity = useTransform(p, [s - 0.01, s + 0.01, e - 0.02, e], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute left-1/2 top-1/2 z-30 -ml-[105px] -mt-[30px] flex w-[210px] items-center gap-3 rounded-2xl border border-line bg-white p-3 font-[family-name:var(--font-ui)] text-ink shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-enos-50 font-mono text-[10px] font-semibold text-enos-800">INV</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold">{inv.city}</span>
        <span className="block text-[11px] text-muted">{inv.rail}</span>
      </span>
      <span className="tnum text-[13px] font-semibold text-enos-700">{inv.amount}</span>
    </motion.div>
  );
}

const toolWin = (i: number) => 0.52 + i * 0.03;

function ToolLine({ p, i, pos }: { p: MotionValue<number>; i: number; pos: readonly [number, number] }) {
  const s = toolWin(i);
  const draw = useTransform(p, [s + 0.03, s + 0.08], [0, 1]);
  return (
    <motion.line x1="0" y1="0" x2={pos[0]} y2={pos[1]} stroke="#A2B9AE" strokeOpacity="0.45" strokeWidth="1.5" style={{ pathLength: draw }} />
  );
}

function ToolTile({
  p,
  i,
  tool,
  dim,
}: {
  p: MotionValue<number>;
  i: number;
  tool: (typeof tools)[number];
  dim: MotionValue<number>;
}) {
  const s = toolWin(i);
  const x = useTransform(p, [s, s + 0.07], [tool.pos[0] * 2.2, tool.pos[0]]);
  const y = useTransform(p, [s, s + 0.07], [tool.pos[1] * 2.2, tool.pos[1]]);
  const rotate = useTransform(p, [s, s + 0.07], [i % 2 ? 40 : -40, 0]);
  const appear = useTransform(p, [s, s + 0.04], [0, 1]);
  const opacity = useTransform([appear, dim] as MotionValue<number>[], ([a, d]: number[]) => a * d);
  const connected = useTransform(p, [s + 0.07, s + 0.09], [0, 1]);
  const Icon = tool.icon;
  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="absolute left-1/2 top-1/2 z-10 -ml-[62px] -mt-[30px] flex h-[60px] w-[124px] items-center gap-2.5 rounded-2xl border border-white/15 bg-deep-800/95 px-3 font-[family-name:var(--font-ui)] text-white backdrop-blur"
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-ube text-white">
        <Icon size={16} />
      </span>
      <span className="text-[13px] font-medium">{tool.label}</span>
      <motion.span style={{ opacity: connected }} className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-deep-900 bg-enos" />
    </motion.div>
  );
}
