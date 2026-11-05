import Link from "next/link";
import { Arr, GetInTouch, SectionLabel, Specs } from "@/components/Blocks";
import { Collage } from "@/components/Collage";
import { Hero } from "@/components/Hero";
import { HoverList, Marquee, Parallax, Reveal, ScrollWords } from "@/components/motion";
import { Photo } from "@/components/Photo";
import { IMG, PROJECTS, RATES, SERVICES } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee items={["Film studio rental", "Custom setbuilding", "980 sq ft white cyclorama", "Tagore Lane, Singapore"]} />

      {/* 01 About */}
      <section className="section relative z-10">
        <div className="wrap">
          <SectionLabel n="01">The studio</SectionLabel>
          <ScrollWords
            className="d d-lg max-w-[18ch]"
            text="A professional set building outfit and film studio, shaped to your brief."
          />
          <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-12">
            <Parallax from={60} to={-60} className="md:col-span-5">
              <Photo img={IMG.makeup} ratio="4 / 5" sizes="(min-width: 768px) 40vw, 100vw" position="center 30%" />
            </Parallax>
            <div className="md:col-span-6 md:col-start-7 md:self-end">
              <Reveal><p className="lede">Whatever the production, we aim to provide the best value for it: a clean white cyclorama, equipment on site, and a team that can build the set you need.</p></Reveal>
              <Reveal delay={0.1}><Link href="/studio" className="eyebrow ulink mt-8 inline-block !text-paper">Tour the studio <Arr /></Link></Reveal>
            </div>
          </div>
          <div className="mt-24 md:mt-40"><Specs /></div>
        </div>
      </section>

      {/* 02 Facilities */}
      <section className="section relative z-10 overflow-hidden bg-ink-2/60 pt-[calc(var(--section)*0.7)]">
        <div className="wrap">
          <SectionLabel n="02">Facilities</SectionLabel>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
            <Reveal><h2 className="d d-lg">More than<br /><span className="outline">a white wall</span></h2></Reveal>
            <Reveal><Link href="/studio" className="eyebrow ulink !text-paper">Studio details <Arr /></Link></Reveal>
          </div>
          <Collage />
        </div>
      </section>

      {/* 03 Services */}
      <section className="section relative z-10">
        <div className="wrap">
          <SectionLabel n="03">Services</SectionLabel>
          <HoverList items={[
            { href: "/services#studio-rental", title: SERVICES[0].title, meta: "Rent the floor", img: SERVICES[0].img },
            { href: "/services#setbuilding", title: SERVICES[1].title, meta: "Build the set", img: SERVICES[1].img },
          ]} />
        </div>
      </section>

      {/* 04 Work */}
      <section className="section rule relative z-10">
        <div className="wrap">
          <SectionLabel n="04">Selected work</SectionLabel>
          <HoverList size="d-md" items={PROJECTS.map((p) => ({ href: `/work/${p.slug}`, title: p.title, meta: p.by, img: p.cover }))} />
          <Reveal><Link href="/work" className="btn mt-12 btn-block-sm">All projects <Arr /></Link></Reveal>
        </div>
      </section>

      {/* 05 Rates */}
      <section className="section rule relative z-10 bg-ink-2/60">
        <div className="wrap">
          <SectionLabel n="05">Rates</SectionLabel>
          <ul className="border-t border-line">
            {RATES.map((r) => (
              <Reveal as="li" key={r.id} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-6 md:py-10">
                <div>
                  <h3 className="d d-md">{r.name}</h3>
                  <p className="eyebrow mt-3">{r.hours} hours · SGD {r.hourly}/hr</p>
                </div>
                <p className="d text-[clamp(3.5rem,11vw,11rem)] leading-[0.82]"><span className="mr-2 align-top text-[0.28em] text-muted">SGD</span>{r.price.toLocaleString("en-SG")}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">All prices include GST and service charge.</p>
            <Link href="/rates" className="eyebrow ulink !text-paper">Rate details <Arr /></Link>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
