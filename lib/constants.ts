export const SITE = {
  name: "Ghazl",
  brandName: "Ghazl App",
  nameArabic: "غَزْل",
  slogan: "Two Threads, One Beautiful Story",
  description:
    "A halal Islamic marriage app for sincere Muslims seeking marriage with intention, respect, and privacy.",
  url: "https://ghazl.app",
  supportEmail: "info@intellibud.org",
  publisher: "Intellibud Innovations",
  publisherUrl: "https://intellibud.org",
  publisherDomain: "intellibud.org",
  bundleId: "com.intellibud.ghazl",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/download", label: "Download" },
  { href: "/support", label: "Support" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: "/about", label: "About" },
    { href: "/download", label: "Download" },
    { href: "/support", label: "Support" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
} as const;

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Begin your journey with sincerity.",
    features: [
      "Create your profile",
      "Limited daily discovers",
      "Basic matching",
      "Respectful messaging",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "Deepen your search with intention.",
    features: [
      "Unlimited discovers",
      "Priority visibility",
      "Read receipts",
      "Advanced filters",
      "Premium support",
    ],
    cta: "Start Premium",
    highlighted: true,
    badge: "Recommended",
  },
] as const;

export const VALUES = [
  "Halal",
  "Respectful",
  "Intentional",
  "Private",
] as const;
