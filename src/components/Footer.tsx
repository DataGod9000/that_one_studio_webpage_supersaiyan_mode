import Link from "next/link";
import { NAV, SITE } from "@/lib/content";
import { DriftWord } from "./motion";

export function Footer() {
  const a = SITE.address;
  return (
    <footer className="rule relative z-10 bg-ink-2">
      <div className="wrap grid gap-12 pb-10 pt-20 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="max-w-[26ch] text-muted">{SITE.tagline}</p>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="space-y-2">{NAV.map((n) => <li key={n.href}><Link href={n.href} className="ulink">{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Visit</h2>
          <address className="not-italic">{a.street}<br />{a.locality} {a.postal}</address>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Contact</h2>
          <ul className="space-y-2">
            <li><a href={`mailto:${SITE.email}`} className="ulink break-all">{SITE.email}</a></li>
            <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ulink">Instagram {SITE.instagramHandle}</a></li>
          </ul>
        </div>
      </div>
      <DriftWord className="d outline select-none text-[22vw] leading-[0.8]" distance={10}>
        <span aria-hidden>THAT ONE STUDIO · THAT ONE STUDIO</span>
      </DriftWord>
      <div className="rule">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} That One Studio. Project photography belongs to the credited filmmakers.</p>
          <p>Rates include GST and service charge.</p>
        </div>
      </div>
    </footer>
  );
}
