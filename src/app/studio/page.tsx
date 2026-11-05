import type { Metadata } from "next";
import { GetInTouch, PageHeader, SectionLabel, Specs } from "@/components/Blocks";
import { Gallery } from "@/components/Gallery";
import { Parallax, Reveal } from "@/components/motion";
import { Photo } from "@/components/Photo";
import { AREAS, GALLERY, IMG } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio facilities",
  description: "A 1,464 sq ft film studio in Singapore with a 980 sq ft white cyclorama, makeup and wardrobe area, client lounge and admin space.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader eyebrow="The studio" line1="A white" line2="cyclorama" lede="Sound-treated, fully equipped and set up for a working crew, with the support spaces a shoot actually needs." />

      <div className="wrap relative z-10">
        <Parallax from={0} to={-50}><Photo img={IMG.lights} ratio="21 / 9" sizes="100vw" priority position="center 40%" /></Parallax>
        <div className="mt-24 md:mt-40"><Specs /></div>
      </div>

      {/* Area by area, each with a giant index numeral */}
      <section className="section relative z-10">
        <div className="wrap space-y-28 md:space-y-48">
          {AREAS.map((a, i) => (
            <div key={a.id} className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
              <Reveal className={i % 2 ? "md:col-span-7 md:col-start-6 md:row-start-1" : "md:col-span-7"}>
                <Photo img={a.img} ratio={a.id === "makeup" ? "4 / 5" : "3 / 2"} sizes="(min-width: 768px) 58vw, 100vw" position={a.id === "makeup" ? "center 30%" : "center"} />
              </Reveal>
              <Reveal delay={0.1} className={i % 2 ? "md:col-span-5 md:col-start-1" : "md:col-span-5"}>
                <p className="d outline text-[clamp(6rem,16vw,14rem)] leading-[0.8]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="d d-md mt-4">{a.title}</h2>
                <p className="lede mt-5">{a.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section rule relative z-10 bg-ink-2/60">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionLabel n="06">Lighting and equipment</SectionLabel>
            <h2 className="d d-lg">12+ light fixtures</h2>
            <p className="lede mt-6">Lighting and equipment are available for use at the studio. Ask what is on hand for your shoot when you enquire.</p>
            <Photo img={IMG.ceiling} ratio="3 / 2" sizes="(min-width: 768px) 40vw, 100vw" className="mt-10" />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <SectionLabel n="07">Floor plan</SectionLabel>
            <div className="frame bg-paper" style={{ aspectRatio: "1302 / 990" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.floorplan.src} alt={IMG.floorplan.alt} className="h-full w-full object-contain" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section relative z-10">
        <div className="wrap">
          <SectionLabel n="08">Gallery</SectionLabel>
          <h2 className="d d-lg mb-14">Look <span className="outline">around</span></h2>
          <Gallery items={GALLERY.map((g, i) => ({ ...g, ratio: i % 4 === 0 ? "4 / 5" : "4 / 3" }))} />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
