import Image from "next/image";
import type { Img } from "@/lib/content";

/** Photograph in a fixed-ratio frame; zooms 1.03 inside the frame on hover (see .frame in globals.css). */
export function Photo({
  img, ratio, sizes, priority = false, className = "", position = "center",
}: {
  img: Img; ratio?: string; sizes: string; priority?: boolean; className?: string; position?: string;
}) {
  return (
    <div className={`frame zoom ${className}`} style={{ aspectRatio: ratio ?? `${img.w} / ${img.h}` }}>
      <Image
        src={img.src} alt={img.alt} fill sizes={sizes} priority={priority}
        className="object-cover" style={{ objectPosition: position }}
      />
    </div>
  );
}
