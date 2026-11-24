"use client";

import Image from "next/image";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { liveMarkets, site } from "@/lib/site";
import eMark from "@/public/enos-e-chartreuse.png";
import Reveal from "./Reveal";

const roles = ["Freelancer or creator", "Merchant or SMB", "Company or trader", "PSP or platform", "Something else"];
const volumes = ["Under $5k a month", "$5k–$50k a month", "$50k–$500k a month", "Over $500k a month"];

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/**
 * The sign-up form every "Open Your Account" button lands on. With site.waitlistEndpoint set it POSTs JSON there and shows
 * success only on a 2xx; until then it opens the visitor's own email app, addressed to site.contactEmail, and says so.
 */
export default function FinalCTA() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (site.waitlistEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.waitlistEndpoint, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({ ...data, source: "enos-one-site" }),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = [
      `Email: ${data.email}`,
      data.whatsapp && `WhatsApp: ${data.whatsapp}`,
      `Based in: ${data.market}`,
      `I am a: ${data.role}`,
      `Money I receive: ${data.volume}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`Open an ${site.product} account`)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  const field =
    "w-full rounded-2xl border border-white/20 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder:text-white/50 transition focus:border-chartreuse focus:outline-none focus:ring-2 focus:ring-chartreuse/40";
  const label = "mono-label mb-2 block text-[10px] text-white/75";

  return (
    <section id="get-started" className="ground-deep grain relative overflow-hidden text-white">
      {/* Cropped e anchored to the bottom-right edge, vertex showing */}
      <Image
        src={eMark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[6%] -right-[30%] h-auto w-[70%] opacity-90 lg:-bottom-[18%] lg:-right-[12%] lg:w-[34%]"
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-enos-300">Get Started</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-8 max-w-[15ch] text-[clamp(2.6rem,5.2vw,5.4rem)] leading-[0.98]">
              AI Is Eating the World. We Make Sure the World Can <em className="text-chartreuse">Pay for It.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-[1.62] text-white/80">
              Tell us who you are and where you sell. We&apos;ll get back to you about opening your {site.product} account.
            </p>
            <span className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] uppercase tracking-[0.18em] text-enos-300">
              <span className="whitespace-nowrap">One Founder</span>
              <i className="h-[5px] w-[5px] rounded-full bg-white/40" />
              <span className="whitespace-nowrap">Every Business</span>
              <i className="h-[5px] w-[5px] rounded-full bg-white/40" />
              <span className="whitespace-nowrap">One Account</span>
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="shadow-warm-lg rounded-[28px] border border-white/15 bg-deep-900 p-6 md:p-9">
            {status === "sent" ? (
              <div role="status" className="py-10 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-chartreuse text-deep-900">
                  <Check size={26} strokeWidth={3} />
                </span>
                <p className="display mt-6 text-3xl">You&apos;re on the list.</p>
                <p className="mt-3 text-white/75">We&apos;ll be in touch about your {site.product} account.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5" aria-labelledby="signup-title" aria-describedby="signup-note">
                <h3 id="signup-title" className="display text-[1.9rem] leading-tight">
                  Open Your Account
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="su-email" className={label}>Email</label>
                    <input id="su-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="su-wa" className={label}>
                      WhatsApp number <span className="normal-case tracking-normal text-white/55">(optional)</span>
                    </label>
                    <input id="su-wa" name="whatsapp" type="tel" autoComplete="tel" placeholder="+63 900 000 0000" className={field} />
                  </div>
                  <div>
                    <label htmlFor="su-market" className={label}>Where you&apos;re based</label>
                    <select id="su-market" name="market" required defaultValue="" className={field}>
                      <option value="" disabled>Choose…</option>
                      {[...liveMarkets, "Somewhere else"].map((m) => (
                        <option key={m} className="bg-deep-900">{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="su-role" className={label}>I am a</label>
                    <select id="su-role" name="role" required defaultValue="" className={field}>
                      <option value="" disabled>Choose…</option>
                      {roles.map((r) => (
                        <option key={r} className="bg-deep-900">{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="su-volume" className={label}>Money you receive</label>
                    <select id="su-volume" name="volume" required defaultValue="" className={field}>
                      <option value="" disabled>Choose…</option>
                      {volumes.map((v) => (
                        <option key={v} className="bg-deep-900">{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="press group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-chartreuse px-8 py-4 text-[15px] font-semibold text-deep-900 hover:bg-white disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Request My Account"}
                  <ArrowRight size={18} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <div id="signup-note" aria-live="polite" className="text-sm leading-relaxed text-white/70">
                  {status === "mailto" ? (
                    <p className="flex gap-2">
                      <Mail size={16} className="mt-0.5 shrink-0 text-chartreuse" />
                      <span>
                        Your email app should have opened with your details filled in: press send there. Nothing opened?{" "}
                        <a href={`mailto:${site.contactEmail}`} className="text-chartreuse underline underline-offset-4">
                          Email {site.contactEmail}
                        </a>
                        .
                      </span>
                    </p>
                  ) : status === "error" ? (
                    <p className="text-saffron">
                      That didn&apos;t go through. Please try again, or email{" "}
                      <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-4">{site.contactEmail}</a>.
                    </p>
                  ) : site.waitlistEndpoint ? (
                    <p>
                      We use your details only to contact you about {site.product}. See our <a href="/privacy" className="underline underline-offset-4">Privacy Policy</a>.
                    </p>
                  ) : (
                    <p>
                      Early access: this opens your email app with your details filled in, addressed to the ENOS team. Nothing is stored on
                      this site. <a href="/privacy" className="underline underline-offset-4">Privacy</a>.
                    </p>
                  )}
                </div>
                {site.whatsappNumber && (
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Hi ENOS, I'd like to open an ${site.product} account.`)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-medium hover:border-chartreuse hover:text-chartreuse"
                  >
                    <MessageCircle size={18} /> Or chat with us on WhatsApp
                  </a>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
