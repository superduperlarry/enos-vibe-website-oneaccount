"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import wordmark from "@/public/enos-wordmark-white.png";

const links = [
  { href: "#how", label: "How It Works" },
  { href: "#who", label: "Who It's For" },
  { href: "#features", label: "Features" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-deep-900/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 border-b border-white/[0.14] px-6 py-5 md:px-10">
        <a href="#top" aria-label="ENOS home" className="shrink-0">
          <Image src={wordmark} alt="enos" className="h-6 w-auto md:h-7" priority />
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="mono-label text-white/70 transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.signupUrl}
          className="press whitespace-nowrap rounded-full bg-chartreuse px-5 py-2.5 text-sm font-semibold text-deep-900 hover:bg-white"
        >
          Open Your Account
        </a>
      </nav>
    </header>
  );
}
