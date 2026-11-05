"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
  type MotionValue,
} from "motion/react";
import type { Img } from "@/lib/content";

const OUT = [0.23, 1, 0.32, 1] as const; // strong ease-out

/** Reduced motion is honoured by every component below. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Rise + fade once. Transform/opacity only, so no layout shift. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "p" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.8, ease: OUT, delay }}>
      {children}
    </Tag>
  );
}

/** Headline whose words rise out of a clipped line. `outline` words are drawn as stroked type. */
export function SplitHeading({ text, className = "", as = "h1", delay = 0, outline = [], accent = [] }: {
  text: string; className?: string; as?: "h1" | "h2"; delay?: number; outline?: string[]; accent?: string[];
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => {
        const key = w.replace(/[.,]/g, "");
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
            <motion.span className={`inline-block ${outline.includes(key) ? "outline" : ""} ${accent.includes(key) ? "accent" : ""}`}
              initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: OUT, delay: delay + i * 0.07 }}>
              {w}{i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

function Word({ p, range, still, children }: { p: MotionValue<number>; range: [number, number]; still: boolean; children: ReactNode }) {
  const opacity = useTransform(p, range, still ? [1, 1] : [0.4, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** Statement that lights up word by word as it scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="mr-[0.22em] inline-block">
          <Word still={!!reduce} p={scrollYProgress} range={[(i / words.length) * 0.85, ((i + 1) / words.length) * 0.85]}>{w}</Word>
        </span>
      ))}
    </p>
  );
}

/** Moves its child between two vertical offsets (px) as it crosses the viewport. */
export function Parallax({ children, from = 40, to = -40, className = "" }: { children: ReactNode; from?: number; to?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, to]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/** Giant outlined word that drifts sideways with scroll. */
export function DriftWord({ children, className = "", distance = 18 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`${distance}%`, `-${distance}%`]);
  return <div ref={ref} aria-hidden className="overflow-hidden"><motion.div style={{ x }} className={`whitespace-nowrap ${className}`}>{children}</motion.div></div>;
}

/** Endless ticker. Content is duplicated for a seamless loop; the copy is hidden from assistive tech. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className={`d d-xl flex items-center px-[0.35em] ${i % 2 ? "outline" : ""} ${i % 3 === 2 ? "accent" : ""}`}>
          {t}<span className="mx-[0.35em] inline-block size-[0.14em] bg-accent" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-6" role="group" aria-label={items.join(", ")}>
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}

export type ListItem = { href: string; title: string; meta: string; img: Img };

/** Index list. On hover-capable screens a preview image follows the cursor; on touch each row shows a thumbnail. */
export function HoverList({ items, size = "d-lg" }: { items: ListItem[]; size?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const onMove = (e: React.MouseEvent) => { x.set(e.clientX + 28); y.set(e.clientY - 150); };

  return (
    <>
      <ul className="rows border-t border-line" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        {items.map((it, i) => (
          <li key={it.href} className="row border-b border-line" onMouseEnter={() => setActive(i)}>
            <Link href={it.href} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
              className="group flex items-center justify-between gap-6 py-7 md:py-10">
              <span className="eyebrow w-8 shrink-0 md:w-12">{String(i + 1).padStart(2, "0")}</span>
              <span className={`d ${size} min-w-0 flex-1`}>{it.title}</span>
              <span className="eyebrow hidden shrink-0 text-right sm:block">{it.meta}</span>
              <span className="frame relative hidden size-16 shrink-0 max-md:block" aria-hidden>
                <Image src={it.img.src} alt="" fill sizes="64px" className="object-cover" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {active !== null && (
          <motion.div aria-hidden style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[300px] w-[240px] overflow-hidden bg-ink-3 [@media(hover:hover)]:md:block"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: OUT }}>
            <Image src={items[active].img.src} alt="" fill sizes="240px" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
