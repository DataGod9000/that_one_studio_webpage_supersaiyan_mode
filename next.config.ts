import type { NextConfig } from "next";

// GitHub Pages build: static export served from /<repo>. Set only by the deploy workflow,
// so `npm run dev` and `npm run start` behave normally (and Vercel is unaffected).
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, trailingSlash: true, basePath } : {}),
  images: { formats: ["image/avif", "image/webp"], unoptimized: pages },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
