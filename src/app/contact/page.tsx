import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact and bookings",
  description: "Enquire about booking the That One Studio film studio or a custom set build. 222 Tagore Lane, Singapore.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = SITE.address;
  return (
    <>
      <PageHeader eyebrow="Contact and bookings" line1="Get in" line2="touch" />
      <div className="wrap relative z-10 grid gap-16 pb-24 md:grid-cols-12 md:pb-40">
        <Reveal className="md:col-span-7">
          <Suspense fallback={<div className="min-h-[560px]" aria-hidden />}><ContactForm /></Suspense>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <div className="space-y-10 border-t border-line pt-8 md:border-t-0 md:pt-0">
            <div><h2 className="eyebrow mb-3">Visit</h2><address className="not-italic text-lg">{a.street}<br />{a.locality} {a.postal}</address></div>
            <div><h2 className="eyebrow mb-3">Email</h2><a href={`mailto:${SITE.email}`} className="ulink break-all text-lg">{SITE.email}</a></div>
            <div><h2 className="eyebrow mb-3">Social</h2><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ulink text-lg">Instagram {SITE.instagramHandle}</a></div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
