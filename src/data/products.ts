/**
 * Demo product data.
 *
 * These entries are sample data for frontend development and preview only.
 * They are NOT verified product information and must not be published as-is.
 *
 * Before publication:
 * 1. Verify the exact manufacturer, model code, product classification and
 *    permitted use of any product imagery.
 * 2. Replace image URLs with approved photography.
 * 3. Review and confirm every specification value — do not invent lift heights,
 *    capacities, weights, dimensions, battery details, warranties or
 *    certifications. Leave unverified fields null.
 * 4. Set `published: true` only after review.
 *
 * The quantities sometimes seen in enquiries describe a customer request,
 * not confirmed inventory or completed sales.
 */
import type { Product } from "@/types/catalog"
export const demoProducts: Product[] = [
  {
    id: "dingli-ba12ne",
    name: "Articulated Boom Lift",
    slug: "dingli-ba12ne-articulated-boom-lift",
    brand: "DINGLI",
    modelNumber: "BA12NE",
    categoryId: "aerial-work-platforms",
    shortDescription: "Articulated boom lift for access work at height.",
    fullDescription:
      "The DINGLI BA12NE is an articulated boom lift designed for work at height. Flexible boom articulation allows access to confined or obstructed work areas. Technical specifications to be confirmed against manufacturer documentation before publication.",
    imageUrls: ["/images/products/demo-boom-lift.jpg"],
    specifications: [
      { name: "Machine type", value: "Articulated boom lift" },
      { name: "Brand", value: "DINGLI" },
      { name: "Model", value: "BA12NE" },
      { name: "Maximum platform height", value: null },
      { name: "Platform capacity", value: null },
      { name: "Power type", value: null },
    ],
    datasheetUrl: null,
    featured: true,
    published: false,
    reviewed: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "dingli-ba18crt2",
    name: "Articulated Boom Lift",
    slug: "dingli-ba18crt2-articulated-boom-lift",
    brand: "DINGLI",
    modelNumber: "BA18CRT2",
    categoryId: "aerial-work-platforms",
    shortDescription: "Articulated boom lift for access work at height.",
    fullDescription:
      "The DINGLI BA18CRT2 is an articulated boom lift designed for work at height. Technical specifications to be confirmed against manufacturer documentation before publication.",
    imageUrls: ["/images/products/demo-boom-lift.jpg"],
    specifications: [
      { name: "Machine type", value: "Articulated boom lift" },
      { name: "Brand", value: "DINGLI" },
      { name: "Model", value: "BA18CRT2" },
      { name: "Maximum platform height", value: null },
      { name: "Platform capacity", value: null },
      { name: "Power type", value: null },
    ],
    datasheetUrl: null,
    featured: true,
    published: false,
    reviewed: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "dingli-ba18cert2",
    name: "Articulated Boom Lift",
    slug: "dingli-ba18cert2-articulated-boom-lift",
    brand: "DINGLI",
    modelNumber: "BA18CERT2",
    categoryId: "aerial-work-platforms",
    shortDescription: "Articulated boom lift for access work at height.",
    fullDescription:
      "The DINGLI BA18CERT2 is an articulated boom lift designed for work at height. Technical specifications to be confirmed against manufacturer documentation before publication.",
    imageUrls: ["/images/products/demo-boom-lift.jpg"],
    specifications: [
      { name: "Machine type", value: "Articulated boom lift" },
      { name: "Brand", value: "DINGLI" },
      { name: "Model", value: "BA18CERT2" },
      { name: "Maximum platform height", value: null },
      { name: "Platform capacity", value: null },
      { name: "Power type", value: null },
    ],
    datasheetUrl: null,
    featured: true,
    published: false,
    reviewed: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "mlift-msx10e",
    name: "Electric Scissor Lift",
    slug: "mlift-msx10e-electric-scissor-lift",
    brand: "MT&T / MLIFT",
    modelNumber: "MSX10E",
    categoryId: "aerial-work-platforms",
    shortDescription: "Electric scissor lift for indoor and outdoor access work.",
    fullDescription:
      "The MT&T / MLIFT MSX10E is an electric scissor lift suitable for access work at height. Technical specifications to be confirmed against manufacturer documentation before publication.",
    imageUrls: ["/images/products/demo-scissor-lift.jpg"],
    specifications: [
      { name: "Machine type", value: "Electric scissor lift" },
      { name: "Brand", value: "MT&T / MLIFT" },
      { name: "Model", value: "MSX10E" },
      { name: "Maximum platform height", value: null },
      { name: "Platform capacity", value: null },
      { name: "Power type", value: "Electric" },
    ],
    datasheetUrl: null,
    featured: false,
    published: false,
    reviewed: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "mlift-msx14e",
    name: "Electric Scissor Lift",
    slug: "mlift-msx14e-electric-scissor-lift",
    brand: "MT&T / MLIFT",
    modelNumber: "MSX14E",
    categoryId: "aerial-work-platforms",
    shortDescription: "Electric scissor lift for indoor and outdoor access work.",
    fullDescription:
      "The MT&T / MLIFT MSX14E is an electric scissor lift suitable for access work at height. Technical specifications to be confirmed against manufacturer documentation before publication.",
    imageUrls: ["/images/products/demo-scissor-lift.jpg"],
    specifications: [
      { name: "Machine type", value: "Electric scissor lift" },
      { name: "Brand", value: "MT&T / MLIFT" },
      { name: "Model", value: "MSX14E" },
      { name: "Maximum platform height", value: null },
      { name: "Platform capacity", value: null },
      { name: "Power type", value: "Electric" },
    ],
    datasheetUrl: null,
    featured: false,
    published: false,
    reviewed: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
]

export const publishedProducts = demoProducts.filter((p) => p.published)
