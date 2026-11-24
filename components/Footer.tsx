import Image from "next/image";
import { site } from "@/lib/site";
import wordmark from "@/public/enos-wordmark-white.png";
import Placeholder from "./Placeholder";

/** `home` prefixes the section links, so the footer also works on /privacy and /terms. */
export default function Footer({ home = "" }: { home?: string }) {
  const legal = "mono-label text-[11px] text-white/70 underline-offset-4 hover:text-white hover:underline";
  return (
    <footer className="bg-deep-900 text-white/70">
      <div className="mx-auto max-w-[1320px] border-t border-white/[0.14] px-6 pb-24 pt-16 md:px-10 md:pb-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <a href={home || "#top"} aria-label="ENOS home" className="inline-block">
              <Image src={wordmark} alt="enos" className="h-8 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm">{site.tagline}.</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3">
            <a href={`${home}#how`} className="mono-label hover:text-white">How It Works</a>
            <a href={`${home}#who`} className="mono-label hover:text-white">Who It&apos;s For</a>
            <a href={`${home}#features`} className="mono-label hover:text-white">Features</a>
            <a href={`mailto:${site.contactEmail}`} className="mono-label hover:text-white">Contact</a>
          </nav>
        </div>

        {/* Compliance and legal notice, wording as approved by ENOS. Fill the bracketed licence numbers before publishing. */}
        <div className="mt-14 border-t border-white/[0.14] pt-10 text-[13px] leading-[1.7]">
          <div className="grid max-w-4xl gap-4">
            <p>
              ENOS is licensed as a Money Service Operator (Hong Kong) and is regulated by the Central Bank of the UAE (CBUAE).
              Operating entities: <Placeholder tone="dark">[ENOS Technologies Ltd — HK MSO licence no. ______]</Placeholder> and{" "}
              <Placeholder tone="dark">[ENOS ADGM / OSN — CBUAE licence no. ______]</Placeholder>.
            </p>
            <p>
              <b className="font-semibold text-white">Not a bank.</b> ENOS is not a bank. Fiat balances are not covered by any deposit
              guarantee scheme (e.g. FDIC / FSCS). Digital-asset balances (USDT/USDC) are not insured, and stablecoin value can fluctuate.
            </p>
            <p>
              <b className="font-semibold text-white">Availability.</b> Services are offered only in jurisdictions where ENOS or its
              partners are licensed. Nothing on this page is an offer or solicitation in a jurisdiction where ENOS is not authorised to
              operate.
            </p>
            <p>
              <b className="font-semibold text-white">Not advice.</b> Nothing on this site is investment, legal, tax or financial advice.
            </p>
            <p>
              <b className="font-semibold text-white">Illustrative.</b> Figures marked &apos;illustrative&apos; are examples or
              forward-looking projections, not actual or guaranteed results.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono-label text-[11px]">© 2026 ENOS. All rights reserved.</span>
              <span aria-hidden>·</span>
              <a href="/privacy" className={legal}>Privacy</a>
              <span aria-hidden>·</span>
              <a href="/terms" className={legal}>Terms</a>
              <span aria-hidden>·</span>
              <a href="/privacy#cookies" className={legal}>Cookies</a>
            </p>
            {site.draftNote && <p className="max-w-xl text-xs text-white/50 md:text-right">{site.draftNote}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
