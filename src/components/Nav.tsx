"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, SITE } from "@/lib/content";

export function Nav() {
  const pathname = usePathname();
  // "open" only for the path it was opened on, so any route change closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenAt(null); toggle.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "bg-ink/85 backdrop-blur-md" : ""}`}>
        <div className="wrap flex h-[76px] items-center justify-between">
          <Link href="/" aria-label="That One Studio, home" className="block">
            <Image src="/images/brand/logo-light.png" alt="That One Studio" width={96} height={47} priority className="h-[44px] w-auto" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-9 min-[1100px]:flex">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname === l.href || pathname.startsWith(l.href + "/") ? "page" : undefined}
                className="eyebrow ulink !text-[0.78rem] aria-[current=page]:!text-accent [@media(hover:hover)]:hover:!text-paper">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-fill !min-h-[42px] !px-5 max-sm:hidden">Book studio</Link>
            <button ref={toggle} type="button" aria-expanded={open} aria-controls="menu"
              onClick={() => setOpenAt(open ? null : pathname)}
              className="btn !min-h-[42px] !gap-3 !px-5 bg-ink/60 backdrop-blur-sm min-[1100px]:hidden">
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-2 w-5" aria-hidden>
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-[var(--gutter)] pb-8 pt-28"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}>
            <ul className="rows">
              {NAV.map((n, i) => (
                <motion.li key={n.href} className="row overflow-hidden"
                  initial={{ y: "100%" }} animate={{ y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.15 + i * 0.06 } }}>
                  <Link href={n.href} aria-current={pathname === n.href || pathname.startsWith(n.href + "/") ? "page" : undefined}
                    className="d d-xl flex items-baseline gap-4 py-1 aria-[current=page]:text-accent">
                    <span className="eyebrow !text-[0.7rem] max-md:hidden">{String(i + 1).padStart(2, "0")}</span>{n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row md:justify-between">
              <address className="not-italic">{SITE.address.street}, {SITE.address.locality} {SITE.address.postal}</address>
              <a href={`mailto:${SITE.email}`} className="ulink w-fit text-paper">{SITE.email}</a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ulink w-fit text-paper">Instagram {SITE.instagramHandle}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
