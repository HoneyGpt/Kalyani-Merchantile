/**
 * Data access layer — demonstration mode.
 *
 * Backed by localStorage so the admin can create, edit, publish and unpublish
 * products during preview. Data persists only in the visitor's browser and is
 * clearly demo data. It is NOT a substitute for a real backend.
 *
 * Path to production: replace every function below with Supabase client calls
 * (products, categories and quote-requests tables, Row Level Security). Call
 * admin mutations through an edge function or with service-role privileges on
 * the server only — never place service-role or private keys in frontend code.
 */
import { demoProducts } from "@/data/products"
import { categories as baseCategories } from "@/data/categories"
import type { Product, Category, QuoteRequest } from "@/types/catalog"

const PRODUCTS_KEY = "km-demo-products"
const CATEGORIES_KEY = "km-demo-categories-v2"
const QUOTES_KEY = "km-demo-quote-requests"

function seedProducts(): Product[] {
  return demoProducts.map((p) => ({ ...p }))
}

function seedCategories(): Category[] {
  return baseCategories.map((c) => ({ ...c }))
}

export function getAllProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return seedProducts()
}

export function saveAllProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  } catch {
    throw new Error("Demo storage is unavailable in this browser.")
  }
}

export function getPublishedProducts(): Product[] {
  return getAllProducts().filter((p) => p.published)
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug)
}

export function getPublishedProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.published && p.slug === slug)
}

export function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const now = new Date().toISOString()
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }
  const products = getAllProducts()
  saveAllProducts([...products, newProduct])
  return newProduct
}

export function updateProduct(id: string, patch: Partial<Product>): Product | null {
  const products = getAllProducts()
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return null
  const updated = {
    ...products[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  }
  products[idx] = updated
  saveAllProducts(products)
  return updated
}

export function deleteProduct(id: string): boolean {
  const products = getAllProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  saveAllProducts(filtered)
  return true
}

export function getCategories(): Category[] {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return seedCategories()
}

export function getPublicCategories(): Category[] {
  return getCategories().filter((category) => !category.hidden)
}

export function saveAllCategories(categories: Category[]): void {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  } catch {
    throw new Error("Demo storage is unavailable in this browser.")
  }
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug)
}

export function getQuoteRequests(): QuoteRequest[] {
  try {
    const stored = localStorage.getItem(QUOTES_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return []
}

export function addQuoteRequest(request: Omit<QuoteRequest, "id" | "status" | "createdAt">): QuoteRequest {
  const now = new Date().toISOString()
  const record: QuoteRequest = {
    ...request,
    id: `qr-${Date.now()}`,
    status: "new",
    createdAt: now,
  }
  try {
    const existing = JSON.parse(localStorage.getItem(QUOTES_KEY) || "[]")
    localStorage.setItem(QUOTES_KEY, JSON.stringify([...existing, record]))
  } catch {
    throw new Error("Demo storage is unavailable in this browser; the enquiry was not saved.")
  }
  return record
}

export function updateQuoteStatus(id: string, status: QuoteRequest["status"]): QuoteRequest | null {
  const requests = getQuoteRequests()
  const idx = requests.findIndex((r) => r.id === id)
  if (idx === -1) return null
  const updated = { ...requests[idx], status }
  requests[idx] = updated
  try {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(requests))
  } catch {}
  return updated
}

export function exportQuotesToCSV(): string {
  const requests = getQuoteRequests()
  const headers = [
    "id",
    "contact_name",
    "company_name",
    "email",
    "phone",
    "preferred_contact",
    "delivery_location",
    "items",
    "quantities",
    "purchase_timeline",
    "notes",
    "status",
    "created_at",
  ]
  const escape = (v: unknown) => {
    const s = String(v ?? "")
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const rows = requests.map((r) =>
    [
      r.id,
      r.contactName,
      r.companyName,
      r.email,
      r.phone,
      r.preferredContact,
      r.deliveryLocation,
      r.requestedItems.map((i) => i.productName).join("; "),
      r.requestedItems.map((i) => i.quantity).join("; "),
      r.purchaseTimeline,
      r.additionalNotes,
      r.status,
      r.createdAt,
    ].map(escape).join(",")
  )
  return [headers.join(","), ...rows].join("\n")
}

export function simulateDelay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
