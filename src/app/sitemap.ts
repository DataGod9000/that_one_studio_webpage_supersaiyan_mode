import type { MetadataRoute } from "next";
import { NAV, PROJECTS, SITE } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...NAV.map((n) => n.href), ...PROJECTS.map((p) => `/work/${p.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
