import Image from "next/image";
import { site } from "@/lib/site";
import wordmark from "@/public/enos-wordmark-white.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-forest-950 text-white/55">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Image src={wordmark} alt="ENOS" className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm font-light">{site.tagline}.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
            <a href="#how" className="hover:text-lime">How it works</a>
            <a href="#features" className="hover:text-lime">Features</a>
            <a href="#who" className="hover:text-lime">Who it&apos;s for</a>
            <a href={`mailto:${site.contactEmail}`} className="hover:text-lime">Contact</a>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-8 text-xs leading-relaxed md:flex-row md:justify-between">
          <p className="kicker text-[11px]">© {new Date().getFullYear()} ENOS · Built. Licensed. Live.</p>
          <p className="max-w-2xl md:text-right">{site.legal}</p>
        </div>
      </div>
    </footer>
  );
}
