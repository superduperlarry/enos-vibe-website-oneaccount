import Image from "next/image";
import { site } from "@/lib/site";
import wordmark from "@/public/enos-wordmark-white.png";

export default function Footer() {
  return (
    <footer className="bg-deep-900 text-white/60">
      <div className="mx-auto max-w-[1320px] border-t border-white/[0.14] px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Image src={wordmark} alt="enos" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm">{site.tagline}.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            <a href="#how" className="mono-label hover:text-white">How It Works</a>
            <a href="#who" className="mono-label hover:text-white">Who It&apos;s For</a>
            <a href="#features" className="mono-label hover:text-white">Features</a>
            <a href={`mailto:${site.contactEmail}`} className="mono-label hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.14] pt-8 text-xs leading-relaxed md:flex-row md:justify-between">
          <p className="mono-label text-[11px]">© {new Date().getFullYear()} ENOS</p>
          <p className="max-w-2xl md:text-right">{site.draftNote}</p>
        </div>
      </div>
    </footer>
  );
}
