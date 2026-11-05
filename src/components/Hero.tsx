"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IMG } from "@/lib/content";
import { Arr } from "./Blocks";
import { Reveal, SplitHeading } from "./motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-28%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <Image src={IMG.entrance.src} alt={IMG.entrance.alt} fill priority sizes="100vw" className="push object-cover object-[62%_50%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" aria-hidden />

      {/* Giant stroked word behind the headline, drifting with scroll */}
      <motion.p aria-hidden style={{ x: wordX }}
        className="d outline pointer-events-none absolute left-0 top-[18%] whitespace-nowrap text-[38vw] leading-[0.8] opacity-30 max-md:top-[22%] max-md:text-[60vw]">
        STUDIO
      </motion.p>

      <div className="wrap relative pb-12 pt-40 md:pb-16">
        <p className="eyebrow mb-6 !text-paper/85">That One Studio · Tagore Lane, Singapore</p>
        <SplitHeading text="Film studio rental and setbuilding." className="d d-xl max-w-[12ch]" accent={["setbuilding"]} />
        <Reveal delay={0.7} className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="lede !text-paper/80">A 1,464 sq ft studio with a 980 sq ft white cyclorama, built around your budget and your shot.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-fill btn-block-sm">Book studio <Arr /></Link>
            <Link href="/work" className="btn btn-block-sm !border-paper/60 bg-ink/40 backdrop-blur-sm">Explore work</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
