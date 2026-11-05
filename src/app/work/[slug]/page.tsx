import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetInTouch } from "@/components/Blocks";
import { Gallery } from "@/components/Gallery";
import { Reveal, SplitHeading } from "@/components/motion";
import { BASE, PROJECTS } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}, by ${p.by}. Shot at That One Studio, Singapore.`,
    alternates: { canonical: `/work/${p.slug}` },
    // Next adds the basePath to metadata URLs itself, so strip ours.
    openGraph: { images: [{ url: p.cover.src.slice(BASE.length), width: p.cover.w, height: p.cover.h, alt: p.cover.alt }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = PROJECTS.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <>
      <section className="wrap pb-14 pt-36 md:pb-20 md:pt-48">
        <Link href="/work" className="eyebrow ulink mb-8 inline-block">← All work</Link>
        <SplitHeading text={p.title} className="d d-xl" />
        <Reveal delay={0.4}>
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-line pt-6">
            <div><dt className="eyebrow">Credit</dt><dd className="mt-1">{p.by}</dd></div>
            <div><dt className="eyebrow">Type</dt><dd className="mt-1">{p.kind}</dd></div>
          </dl>
        </Reveal>
      </section>
      <div className="wrap relative z-10 pb-24 md:pb-40">
        <Gallery
          items={p.images.map((im, k) => ({ ...im, ratio: `${im.w} / ${im.h}`, span: k === 0 ? "col-span-2 lg:col-span-3" : undefined }))}
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>
      <section className="rule relative z-10 bg-ink">
        <Link href={`/work/${next.slug}`} className="wrap group block py-16 md:py-28">
          <p className="eyebrow mb-4">Next project</p>
          <p className="d d-xl outline transition-colors duration-200 [@media(hover:hover)]:group-hover:text-paper">{next.title}</p>
        </Link>
      </section>
      <GetInTouch />
    </>
  );
}
