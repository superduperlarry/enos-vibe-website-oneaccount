"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import wordmark from "@/public/enos-wordmark-white.png";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#who", label: "Who it's for" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-forest-950/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" aria-label="ENOS home" className="shrink-0">
          <Image src={wordmark} alt="ENOS" className="h-7 w-auto md:h-8" priority />
        </a>
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-white/70 backdrop-blur-md md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.signupUrl}
          className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-white"
        >
          Open your account
        </a>
      </nav>
    </header>
  );
}
