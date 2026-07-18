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

export const VALUES = [
  "Halal",
  "Respectful",
  "Intentional",
  "Private",
] as const;
