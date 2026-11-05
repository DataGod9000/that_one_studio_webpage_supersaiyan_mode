import type { Metadata } from "next";
import Link from "next/link";
import { Arr, GetInTouch, PageHeader } from "@/components/Blocks";
import { Parallax, Reveal } from "@/components/motion";
import { Photo } from "@/components/Photo";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Film studio rental and custom setbuilding in Singapore, from concept to completion.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" line1="Providing" line2="everything" lede="Providing everything you need, from the empty cyclorama to a finished set." />
      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} className="rule relative z-10 scroll-mt-20 py-20 md:py-36">
          <div className="wrap grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="d outline text-[clamp(8rem,24vw,22rem)] leading-[0.75]">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="d d-lg mt-4">{s.title}</h2>
            </Reveal>
            <Parallax from={50} to={-50} className="md:col-span-5">
              <Photo img={s.img} ratio="4 / 5" sizes="(min-width: 768px) 40vw, 100vw" />
            </Parallax>
            <Reveal className="md:col-span-5 md:col-start-1">
              <p className="text-xl">{s.lead}</p>
              <p className="mt-3 text-muted">{s.body}</p>
              <Link href={s.cta.href} className="btn btn-fill btn-block-sm mt-10">{s.cta.label} <Arr /></Link>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
              <ul className="border-t border-line">
                {s.points.map((p) => <li key={p} className="border-b border-line py-4">{p}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}
      <GetInTouch />
    </>
  );
}
