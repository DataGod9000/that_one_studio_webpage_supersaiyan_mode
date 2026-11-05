import Link from "next/link";
import { Arr } from "@/components/Blocks";

export default function NotFound() {
  return (
    <section className="wrap relative z-10 flex min-h-[90svh] flex-col items-start justify-center gap-8 pt-28">
      <p className="eyebrow">404</p>
      <h1 className="d d-xl">Cut. <span className="outline">Not on set.</span></h1>
      <Link href="/" className="btn btn-fill">Back to home <Arr /></Link>
    </section>
  );
}
