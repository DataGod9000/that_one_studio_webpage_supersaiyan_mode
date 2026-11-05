"use client";

import { motion } from "motion/react";

/** Page transition: an accent curtain wipes up off the new page. Transform only. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[90] origin-top bg-accent"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }} />
      {children}
    </>
  );
}
