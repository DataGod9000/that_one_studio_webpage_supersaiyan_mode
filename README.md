# That One Studio: website

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion. Film studio rental and setbuilding, Tagore Lane, Singapore.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start   # production check
npm run lint
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/lib/content.ts` | All copy, rates, projects and image metadata (single source of truth) |
| `src/app/globals.css` | Design tokens (colour, type, spacing, motion) and component classes |
| `src/components/motion.tsx` | Reveal, split headings, scroll-lit words, parallax, marquee, hover-preview list |
| `src/components/` | Nav, Chrome (grid lines + rail), Hero, Collage, Gallery, ContactForm, Blocks |
| `public/images/` | Studio and project photography (from the existing site) |

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | No | If set, the form POSTs JSON here (e.g. a Formspree URL). If empty, the form opens the visitor's email app (mailto) and never claims a message was sent. |

No secrets are used or committed.

## Deploy to Vercel (preview first)

1. Vercel dashboard → **Add New → Project** → import `DataGod9000/that_one_studio_webpage_supersaiyan_mode`.
2. Framework preset: **Next.js** (auto-detected). Build command `npm run build`, output default.
3. Add the two environment variables above (Preview and Production).
4. Deploy. Every push to a non-`main` branch gets its own preview URL; check it before promoting.
5. Do **not** attach the production domain until the owner has signed off on the open items in `output.txt`.

CLI alternative: `npx vercel` (preview), `npx vercel --prod` (production, only after approval).
