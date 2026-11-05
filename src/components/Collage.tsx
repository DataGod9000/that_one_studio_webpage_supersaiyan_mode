import Image from "next/image";
import { IMG, type Img } from "@/lib/content";
import { Parallax } from "./motion";

// left / top / width are % of the stage; from/to are parallax offsets in px.
const SCATTER: { img: Img; l: number; t: number; w: number; r: string; from: number; to: number }[] = [
  { img: IMG.entrance, l: 3, t: 2, w: 40, r: "4 / 3", from: 70, to: -30 },
  { img: IMG.makeup, l: 64, t: 0, w: 24, r: "4 / 5", from: 40, to: -90 },
  { img: IMG.cyclorama, l: 38, t: 24, w: 33, r: "3 / 2", from: 90, to: -40 },
  { img: IMG.client, l: 6, t: 46, w: 28, r: "4 / 3", from: 30, to: -70 },
  { img: IMG.admin, l: 70, t: 42, w: 27, r: "4 / 3", from: 80, to: -20 },
  { img: IMG.lights, l: 34, t: 62, w: 34, r: "3 / 2", from: 40, to: -80 },
  { img: IMG.ceiling, l: 68, t: 74, w: 29, r: "4 / 3", from: 60, to: -40 },
];

function Tile({ img, r, sizes }: { img: Img; r: string; sizes: string }) {
  return (
    <div className="frame zoom" style={{ aspectRatio: r }}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** Scattered studio photographs that drift at different speeds. Staggered two-column grid on mobile. */
export function Collage() {
  return (
    <>
      <div className="relative mx-auto hidden h-[70vw] max-h-[1120px] w-full max-w-[1600px] md:block">
        {SCATTER.map((s) => (
          <div key={s.img.src} className="absolute" style={{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.w}%` }}>
            <Parallax from={s.from} to={s.to}><Tile img={s.img} r={s.r} sizes="(min-width: 768px) 30vw, 50vw" /></Parallax>
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 md:hidden">
        {SCATTER.slice(0, 6).map((s, i) => (
          <li key={s.img.src} className={i % 2 ? "mt-10" : ""}><Tile img={s.img} r="4 / 5" sizes="50vw" /></li>
        ))}
      </ul>
    </>
  );
}
