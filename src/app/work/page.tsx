import type { Metadata } from "next";
import Link from "next/link";
import { GetInTouch, PageHeader } from "@/components/Blocks";
import { HoverList, Reveal } from "@/components/motion";
import { Photo } from "@/components/Photo";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Productions shot at That One Studio: JJ Lin & Prestige Hong Kong, CNA LUX Fiona Xie, Law Society Anthology and The Space Race.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Work" line1="Made on" line2="our floor" lede="Productions shot at the studio, credited to the filmmakers behind them." />
      <section className="wrap relative z-10 pb-24 md:pb-40">
        <HoverList size="d-md" items={PROJECTS.map((p) => ({ href: `/work/${p.slug}`, title: p.title, meta: p.by, img: p.cover }))} />
        <ul className="mt-24 grid gap-x-6 gap-y-16 md:mt-40 md:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.slug} className={["md:col-span-5", "md:col-span-7 md:mt-32", "md:col-span-7", "md:col-span-5 md:mt-32"][i]}>
              <Link href={`/work/${p.slug}`} className="block">
                <Photo img={p.cover} ratio={["4 / 5", "16 / 10", "3 / 2", "16 / 10"][i]} sizes="(min-width: 768px) 58vw, 100vw" />
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h2 className="d d-md !text-[clamp(1.8rem,3vw,3rem)]">{p.title}</h2>
                  <span className="eyebrow shrink-0">{p.kind}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <GetInTouch title="Your project could be next." />
    </>
  );
}
