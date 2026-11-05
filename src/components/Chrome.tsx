"use client";

import { SITE } from "@/lib/content";

/** Fixed hairline column grid and the right-hand rail (desktop): Instagram + back to top. */
export function Chrome() {
  return (
    <>
      <div aria-hidden className="gridlines"><i /><i /><i /><i /></div>
      <aside className="rail" aria-label="Social links and page controls">
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="That One Studio on Instagram"
          className="flex size-10 items-center justify-center text-muted transition-colors duration-200 hover:text-accent">
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="eyebrow vert py-3 transition-colors duration-200 hover:text-paper">
          Back to top
        </button>
      </aside>
    </>
  );
}
