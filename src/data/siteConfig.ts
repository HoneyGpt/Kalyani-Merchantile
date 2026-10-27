/**
 * Site configuration for Kalyani Mercantile.
 *
 * These are editable values owned by the business. Any field left empty
 * (empty string, null, or undefined) is intentionally hidden on the
 * published website — no placeholder or invented data is ever shown.
 */
export const siteConfig = {
  name: "Kalyani Mercantile",
  tagline: "Many Needs. One Trusted Partner.",
  description:
    "Procurement and supply solutions across industrial, commercial, food and dairy, infrastructure, office and institutional needs. Kalyani Mercantile helps organisations source products and project supplies through clear quotations and supplier coordination.",
  category: "Procurement & Supply Solutions",
  /** Production domain is set to the owner's selected domain; VITE_SITE_URL can override it per environment. */
  siteUrl: (import.meta.env.VITE_SITE_URL || "https://kalyanimerchantile.tech").replace(/\/$/, ""),
  announcement: "Procurement & Supply Solutions for Business",

  // Contact details — only shown when a value is provided.
  phone: "+91 7075539156",
  email: "sales.team@kalyanimerchantile.tech",
  whatsapp: "",
  address: "", // e.g. "Kakinada, Andhra Pradesh, India"
  businessHours: "", // e.g. "Mon–Sat, 10:00 AM – 6:30 PM"

  // Registration identifiers — never invented; show only when verified.
  gstin: "",
  udyam: "",

  social: {
    website: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  },

  // Default SEO metadata, overridden per-page where needed.
  defaultSeo: {
    title: "Kalyani Mercantile — Procurement & Supply Solutions",
    description:
      "Kalyani Mercantile helps businesses source industrial, food and dairy, road, office and commercial supplies. Share your requirement for a clear quotation.",
    openGraph: {
      site_name: "Kalyani Mercantile",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
    },
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Our Approach", href: "/about#approach" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}
