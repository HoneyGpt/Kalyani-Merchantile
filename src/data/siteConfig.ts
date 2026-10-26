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
    "Procurement and supply solutions for businesses. We help organisations source industrial equipment, products and supplies with clear communication, competitive quotations and dependable coordination.",
  category: "Procurement & Supply Solutions",
  /** Set only after a real custom domain has been selected. */
  siteUrl: import.meta.env.VITE_SITE_URL || "",
  announcement: "Procurement & Supply Solutions for Business",

  // Contact details — only shown when a value is provided.
  phone: "+91 9247633556",
  email: "kalyanisrinivasu236@gmail.com",
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
      "Kalyani Mercantile helps businesses source industrial equipment and supplies. Request quotations for products you need — no hidden prices, no invented claims.",
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
