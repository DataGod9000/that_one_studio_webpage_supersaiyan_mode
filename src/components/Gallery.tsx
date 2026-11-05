"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Img } from "@/lib/content";

type Item = Img & { span?: string; ratio?: string };

/** Responsive photo grid with an accessible lightbox (Esc, arrows, focus return, scroll lock). */
export function Gallery({ items, sizes = "(min-width: 1024px) 33vw, 50vw", className = "" }: { items: Item[]; sizes?: string; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => { setIndex(null); opener.current?.focus(); }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [index, close, step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 ${className}`}>
        {items.map((it, i) => (
          <li key={it.src} className={it.span}>
            <button
              type="button"
              className="block w-full text-left"
              aria-label={`Open photo: ${it.alt}`}
              onClick={(e) => { opener.current = e.currentTarget; setIndex(i); }}
            >
              <div className="frame" style={{ aspectRatio: it.ratio ?? "4 / 3" }}>
                <Image src={it.src} alt="" fill sizes={sizes} className="object-cover" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Photo viewer"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={close}
          >
            <button ref={closeRef} type="button" onClick={close} aria-label="Close photo viewer"
              className="eyebrow absolute right-4 top-4 z-10 flex h-12 items-center px-4 hover:!text-paper md:right-8 md:top-8">
              Close
            </button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="btn btn-ghost absolute left-3 top-1/2 z-10 !min-h-12 !w-12 -translate-y-1/2 !px-0 md:left-8">←</button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}
              className="btn btn-ghost absolute right-3 top-1/2 z-10 !min-h-12 !w-12 -translate-y-1/2 !px-0 md:right-8">→</button>
            <motion.div
              key={current.src}
              className="relative h-full w-full max-w-[1600px]"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>
            <p className="sr-only" aria-live="polite">Photo {index! + 1} of {items.length}: {current.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
