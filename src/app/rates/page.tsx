import type { Metadata } from "next";
import Link from "next/link";
import { Arr, PageHeader, SectionLabel } from "@/components/Blocks";
import { Reveal } from "@/components/motion";
import { AREAS, RATES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rental rates",
  description: "Film studio rental rates in Singapore: full day (10 hours) SGD 1,100, half day (5 hours) SGD 600, inclusive of GST and service charge.",
  alternates: { canonical: "/rates" },
};

export default function RatesPage() {
  return (
    <>
      <PageHeader eyebrow="Rates" line1="Two ways" line2="to book" lede="All prices are inclusive of GST and service charge." />
      <div className="wrap relative z-10">
        <ul className="border-t border-line">
          {RATES.map((r) => (
            <Reveal as="li" key={r.id} className="grid grid-cols-1 items-end gap-6 border-b border-line py-10 md:grid-cols-[1fr_auto] md:py-16">
              <div>
                <p className="eyebrow">{r.hours} hours · SGD {r.hourly} per hour</p>
                <h2 className="d d-lg mt-3">{r.name}</h2>
              </div>
              <p className="d text-[clamp(5rem,17vw,16rem)] leading-[0.8]"><span className="mr-2 align-top text-[0.22em] text-muted">SGD</span>{r.price.toLocaleString("en-SG")}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Published rates, to be confirmed with the studio when you enquire.</p>
      </div>

      <section className="section relative z-10">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionLabel n="01">At the studio</SectionLabel>
            <h2 className="d d-lg">What you are booking</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-line">
              <li className="border-b border-line py-4">1,464 sq ft studio with a 980 sq ft white cyclorama</li>
              <li className="border-b border-line py-4">12+ light fixtures available for use</li>
              {AREAS.slice(2).map((a) => <li key={a.id} className="border-b border-line py-4">{a.title}</li>)}
            </ul>
            <p className="mt-6 text-sm text-muted">Set building is quoted per project. Booking terms, deposits and cancellation are agreed directly with the studio when you enquire.</p>
            <Link href="/contact" className="btn btn-fill btn-block-sm mt-10">Check a date <Arr /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
