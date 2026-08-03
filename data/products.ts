export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  sizes: string[];
  description: string;
  formula: string;
  ingredients: string[];
  usage: {
    morning: string;
    evening: string;
  };
  images: string[];
}

export const PRODUCTS: Record<string, Product> = {
  "radiance-serum": {
    id: "radiance-serum",
    name: "Radiance Serum",
    subtitle: "Cellular Renewal & Illumination",
    price: 98,
    sizes: ["30ml", "50ml"],
    description:
      "A concentrated treatment combining biomimetic peptides and cold-pressed botanicals to restore luminosity, refine texture, and fortify the barrier.",
    formula:
      "Formulated with an optimal 5% Niacinamide concentration alongside copper tripeptides and bio-fermented sea kelp. Absorbs seamlessly without tacky residue.",
    ingredients: [
      "Niacinamide (5%)",
      "Copper Tripeptide-1",
      "Wild Rosehip Extract",
      "Bio-Fermented Sea Kelp",
      "Sodium Hyaluronate",
    ],
    usage: {
      morning: "Apply 3–4 drops after cleansing. Press gently into face and neck before moisturizer.",
      evening: "Smooth onto clean skin as step 2 of your ritual. Follow with Barrier Repair Cream.",
    },
    images: [
      "/images/Products/serum-front.png",
      "/images/Products/serum-angle.png",
      "/images/Products/serum-box.png",
    ],
  },
  "gentle-cleanser": {
    id: "gentle-cleanser",
    name: "Gentle Refining Cleanser",
    subtitle: "pH-Balancing Botanical Purifier",
    price: 64,
    sizes: ["150ml", "250ml"],
    description:
      "A non-foaming velvet gel that melts away surface impurities, sunscreen, and light makeup while preserving delicate skin lipids.",
    formula:
      "Utilizes plant-derived saponins and soothing chamomile hydrosol to purify without disrupting optimal skin pH.",
    ingredients: [
      "Chamomile Hydrosol",
      "Oat Kernel Extract",
      "Glycerin",
      "Green Tea Ferment",
    ],
    usage: {
      morning: "Massage 1–2 pumps onto damp skin for 60 seconds. Rinse with lukewarm water.",
      evening: "Use as your primary or second cleanse to thoroughly dissolve makeup and pollutants.",
    },
    images: [
      "/images/Products/cleanser-front.png",
      "/images/Products/cleanser-angle.png",
    ],
  },
  "barrier-cream": {
    id: "barrier-cream",
    name: "Barrier Repair Cream",
    subtitle: "Bio-Identical Lipid Restorative",
    price: 88,
    sizes: ["50ml", "100ml"],
    description:
      "A rich yet breathable lipid matrix designed to reinforce compromised skin barriers and seal in deep moisture.",
    formula:
      "Enriched with a 3:1:1 ratio of bio-identical ceramides, phytosterols, and fatty acids alongside sugar-derived squalane.",
    ingredients: [
      "Ceramide NP / AP / EOP",
      "Plant-Derived Squalane",
      "Centella Asiatica",
      "Shea Butter Ester",
    ],
    usage: {
      morning: "Press a dime-sized amount into face and neck as your final hydration step.",
      evening: "Apply a generous layer to seal in active serums overnight.",
    },
    images: [
      "/images/Products/cream-front.png",
      "/images/Products/cream-angle.png",
    ],
  },
  "hydrating-essence": {
    id: "hydrating-essence",
    name: "Hydrating Essence Toner",
    subtitle: "Deep Moisture Cellular Prep",
    price: 52,
    sizes: ["120ml", "200ml"],
    description:
      "An ultra-light liquid essence that delivers micro-hydration deep into surface layers, prepping skin for maximum active absorption.",
    formula:
      "Infused with multi-molecular hyaluronic acid and wild rose hydrosol for instantaneous plumpping and redness relief.",
    ingredients: [
      "Wild Rose Hydrosol",
      "Multi-Weight Hyaluronic Acid",
      "Aloe Leaf Juice",
      "Beta-Glucan",
    ],
    usage: {
      morning: "Dispense into palms and press gently into clean face and neck until absorbed.",
      evening: "Layer 2–3 applications for an ultra-hydrated, glass-skin finish before serums.",
    },
    images: [
      "/images/Products/toner-front.png",
      "/images/Products/toner-angle.png",
    ],
  },
};