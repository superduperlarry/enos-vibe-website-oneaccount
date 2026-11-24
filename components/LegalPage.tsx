import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import wordmark from "@/public/enos-wordmark-white.png";
import Footer from "./Footer";
import Placeholder from "./Placeholder";

export type LegalSection = { id: string; title: string; note?: React.ReactNode };

const home = "/latest";

/** A one-page legal stub. Every section stays a marked placeholder until ENOS legal supplies the text. */
export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <header className="ground-deep text-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 border-b border-white/[0.14] px-6 py-5 md:px-10">
          <a href={home} aria-label="ENOS home">
            <Image src={wordmark} alt="enos" className="h-6 w-auto md:h-7" priority />
          </a>
          <a href={home} className="mono-label inline-flex items-center gap-2 text-white/75 hover:text-white">
            <ArrowLeft size={14} /> Back to site
          </a>
        </div>
      </header>

      <main id="main" className="bg-parchment text-ink">
        <div role="note" className="border-b border-saffron/50 bg-saffron/20">
          <p className="mx-auto max-w-[1320px] px-6 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink md:px-10">
            Draft — placeholder · Not the final legal text · To be supplied and approved by ENOS legal
          </p>
        </div>
        <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
          <p className="eyebrow text-lagoon">Legal</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,5vw,4rem)] text-deep">{title}</h1>
          <p className="mt-6 text-lg leading-[1.62] text-ink-2">{intro}</p>

          <nav aria-label="On this page" className="mt-10 rounded-[20px] bg-white p-6 shadow-warm-sm">
            <p className="mono-label text-muted">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-[15px] sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-deep underline-offset-4 hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 grid gap-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2 className="display text-[1.7rem] leading-tight text-deep">
                  {i + 1}. {s.title}
                </h2>
                {s.note && <p className="mt-3 text-[16px] leading-[1.62] text-ink-2">{s.note}</p>}
                <p className="mt-3 text-[15px]">
                  <Placeholder>[Text to be supplied by ENOS legal]</Placeholder>
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer home={home} />
    </>
  );
}
