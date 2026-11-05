/**
 * Source-of-truth content, taken from https://www.thatonestudio.co/ (fetched 2026-11-05).
 * Anything marked `unverified` needs owner confirmation before launch.
 */
export const SITE = {
  name: "That One Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thatonestudio.co",
  email: "wearethatone@gmail.com",
  instagram: "https://www.instagram.com/weare.thatone/",
  instagramHandle: "@weare.thatone",
  address: {
    street: "222 Tagore Lane, #02-09 TG Building",
    locality: "Singapore",
    postal: "787603",
  },
  tagline: "Professional set building and film studio rental in Singapore.",
};

export const SPECS = [
  { value: "1,464", unit: "sq ft", label: "Total studio area" },
  { value: "980", unit: "sq ft", label: "White cyclorama" },
  // unverified: the live homepage says 20.0 ft, the Studio Facilities page says 7.0 m. They disagree.
  { value: "7.0", unit: "m", label: "Ground to ceiling" },
  { value: "12+", unit: "", label: "Light fixtures on site" },
];

export const NAV = [
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/rates", label: "Rates" },
  { href: "/contact", label: "Contact" },
];

export type Img = { src: string; w: number; h: number; alt: string };
const img = (src: string, w: number, h: number, alt: string): Img => ({ src: `/images/${src}`, w, h, alt });

export const IMG = {
  entrance: img("studio/entrance.jpg", 1620, 1080, "Studio entrance with the That One Studio neon sign"),
  cyclorama: img("studio/cyclorama.jpg", 1620, 1080, "The white cyclorama with a single light stand"),
  ceiling: img("studio/ceiling.jpg", 1620, 1080, "Cyclorama and overhead lighting grid"),
  floor: img("studio/studio-floor.jpg", 1620, 1080, "Wide view across the studio floor"),
  lights: img("studio/facilities.jpg", 2400, 1600, "Two studio lights on stands against the white cyclorama"),
  admin: img("studio/admin.jpg", 1620, 1080, "Admin and preparation area with equipment storage"),
  makeup: img("studio/makeup.jpg", 1080, 1620, "Makeup and wardrobe area with mirrors and curtains"),
  client: img("studio/client.jpg", 1620, 1080, "Client lounge with sofas and a wall-mounted screen"),
  floorplan: img("studio/floorplan.jpg", 1302, 990, "Studio floor plan showing cyclorama, client area, makeup and pantry"),
  set1: img("studio/g1.jpg", 1324, 883, "Production in progress on a built set"),
  set2: img("studio/g2.jpg", 1324, 883, "Crew filming a scene on a built set"),
  shoot: img("studio/g3.jpg", 1324, 883, "A model on the cyclorama with a projected backdrop"),
};

export const GALLERY: Img[] = [
  IMG.entrance, IMG.cyclorama, IMG.lights, IMG.ceiling, IMG.floor,
  IMG.makeup, IMG.client, IMG.admin, IMG.shoot,
];

export const AREAS = [
  { id: "cyclorama", title: "Cyclorama", img: IMG.cyclorama, text: "A 980 sq ft white cyclorama for video and stills, with equipment on site." },
  { id: "entrance", title: "Entrance", img: IMG.entrance, text: "Sound-treated entrance doors, with tables and shoe racks to keep the floor clean." },
  { id: "makeup", title: "Makeup and wardrobe", img: IMG.makeup, text: "Large mirrors, so talent can see themselves from every angle." },
  { id: "client", title: "Client lounge", img: IMG.client, text: "A comfortable space for clients to work or relax during the shoot." },
  { id: "admin", title: "Admin and preparation", img: IMG.admin, text: "Charging points and large desks for laptops and monitors, with ample room." },
];

/**
 * Attribution of stills to projects was inferred by looking at the images, because the
 * source site's markup groups them unreliably. `unverified` means confirm with the owner.
 */
export type Project = {
  slug: string; title: string; by: string; kind: string; cover: Img; images: Img[]; unverified?: boolean;
};
export const PROJECTS: Project[] = [
  {
    slug: "jj-lin-prestige-hong-kong", title: "JJ Lin & Prestige Hong Kong", by: "Reuben Foong", kind: "Editorial portrait",
    cover: img("work/x3.jpg", 2400, 3000, "JJ Lin portrait for Prestige Hong Kong"),
    images: [
      img("work/x3.jpg", 2400, 3000, "JJ Lin portrait for Prestige Hong Kong"),
      img("work/x2.jpg", 2400, 3000, "Colour-washed portrait from the JJ Lin shoot"),
      img("work/x1.jpg", 2400, 3000, "Soft-focus editorial frame from the JJ Lin shoot"),
      img("work/banner.jpg", 2191, 897, "Monochrome portrait banner"),
      img("work/jjlin-3.jpg", 2400, 1800, "Dark editorial portrait with sequins"),
    ],
    unverified: true,
  },
  {
    slug: "cna-lux-fiona-xie", title: "CNA LUX Fiona Xie", by: "Reuben Foong", kind: "Fashion and beauty",
    cover: img("work/cna-4.jpg", 2400, 1600, "Fiona Xie on the cyclorama with strip lights"),
    images: [
      img("work/jjlin-1.jpg", 2400, 1800, "Fiona Xie inside a glass cube"),
      img("work/cna-4.jpg", 2400, 1600, "Fiona Xie on the cyclorama with strip lights"),
      img("work/cna-5.jpg", 1431, 954, "Fiona Xie jumping in a black dress on the cyclorama"),
      img("work/jjlin-2.png", 658, 856, "Beauty close-up with sunglasses and a green earring"),
    ],
    unverified: true,
  },
  {
    slug: "law-society-anthology", title: "Law Society Anthology", by: "Biome Entertainment", kind: "Narrative film",
    cover: img("work/cna-2.jpg", 1600, 670, "Overhead view of a dark interview set"),
    images: [
      img("work/cna-2.jpg", 1600, 670, "Overhead view of a dark interview set"),
      img("work/cna-3.jpg", 1600, 667, "Two people at a table in a lit pool of light"),
      img("work/cna-1.jpg", 1600, 1067, "Wide shot of the dark set with a hanging lamp"),
      img("work/law-5.jpg", 1024, 427, "Interview scene, side angle"),
    ],
    unverified: true,
  },
  {
    slug: "the-space-race", title: "The Space Race", by: "Heng Films", kind: "Game show",
    cover: img("work/law-1.jpg", 1571, 883, "The Space Race game show set"),
    images: [
      img("work/law-1.jpg", 1571, 883, "The Space Race game show set"),
      img("work/law-2.jpg", 1571, 883, "Host reading a question on The Space Race"),
      img("work/law-3.jpg", 1571, 883, "Contestants at the podium on The Space Race"),
    ],
    unverified: true,
  },
];

export const SERVICES = [
  {
    id: "studio-rental", title: "Film studio rental",
    lead: "Find the perfect film studio rental for your next production.",
    body: "Our studio is equipped with everything you need to make your shoot a success.",
    points: ["1,464 sq ft studio floor", "980 sq ft white cyclorama", "12+ light fixtures available", "Makeup and wardrobe area", "Client lounge", "Admin area with charging points and desks"],
    img: IMG.floor, cta: { href: "/rates", label: "See rental rates" },
  },
  {
    id: "setbuilding", title: "Custom setbuilding",
    lead: "Our setbuilding services can help you bring your vision to life.",
    body: "From concept to completion, we can build anything you need for your next project.",
    points: ["Concept to completion", "Tailored to your budget", "Built to your production's needs"],
    img: IMG.set1, cta: { href: "/contact?type=Set+building", label: "Discuss a build" },
  },
];

export const RATES = [
  { id: "full", name: "Full day", hours: 10, price: 1100, hourly: 110 },
  { id: "half", name: "Half day", hours: 5, price: 600, hourly: 120 },
];
