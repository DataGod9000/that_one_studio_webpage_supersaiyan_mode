import Link from "next/link";
import { SPECS } from "@/lib/content";
import { DriftWord, Reveal, SplitHeading } from "./motion";

export const Arr = () => <span className="arr" aria-hidden>→</span>;

/** Inner-page title: two giant lines, the second stroked. */
export function PageHeader({ eyebrow, line1, line2, lede }: { eyebrow: string; line1: string; line2: string; lede?: string }) {
  return (
    <section className="wrap pb-14 pt-36 md:pb-24 md:pt-48">
      <p className="eyebrow mb-6">{eyebrow}</p>
      <SplitHeading text={line1} className="d d-xl" />
      <SplitHeading as="h2" text={line2} className="d d-xl" outline={line2.split(" ")} delay={0.2} />
      {lede && <Reveal delay={0.4}><p className="lede mt-10">{lede}</p></Reveal>}
    </section>
  );
}

export function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="eyebrow mb-8 flex items-center gap-4"><span className="text-accent">{n}</span><span className="h-px w-12 bg-line" />{children}</p>;
}

/** Oversized numerals. */
export function Specs() {
  return (
    <dl className="border-t border-line">
      {SPECS.map((s, i) => (
        <Reveal key={s.label} delay={0.05} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-4 md:grid-cols-[2fr_1fr] md:py-6">
            <dt className="eyebrow order-2 text-right md:text-left">{s.label}</dt>
            <dd className="d order-1 flex items-baseline gap-3 text-[clamp(5rem,19vw,17rem)] leading-[0.82]">
              <span className={i % 2 ? "outline" : ""}>{s.value}</span>
              <span className="d-md text-muted">{s.unit}</span>
            </dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** Closing CTA: "GET IN" solid, "TOUCH" ghosted, as a drifting outline word. */
export function GetInTouch({ title = "Book the floor." }: { title?: string }) {
  return (
    <section className="rule relative z-10 overflow-hidden bg-ink">
      <div className="wrap section">
        <Reveal><p className="eyebrow mb-8">Ready when you are</p></Reveal>
        <Reveal><p className="d d-xxl">Get in<span className="sr-only"> touch</span></p></Reveal>
        <DriftWord className="d d-xxl ghost" distance={8}>Touch · Touch · Touch</DriftWord>
        <div className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal><p className="lede">{title} Tell us the date, the crew size and what you need on set.</p></Reveal>
          <Reveal delay={0.1} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact" className="btn btn-fill btn-block-sm">Send enquiry <Arr /></Link>
            <Link href="/rates" className="btn btn-block-sm">See rates</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
