export interface Category {
  id: string
  name: string
  description: string
  image: string
  slug: string
  /** Example product types supplied as category taxonomy, not confirmed listings. */
  subcategories?: string[]
  /** Indicative source-catalogue count; not stock or Kalyani-published products. */
  referenceCount?: string
  additionalTypeCount?: number
  hidden?: boolean
}

export interface Specification {
  name: string
  value: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  brand: string | null
  modelNumber: string | null
  categoryId: string
  shortDescription: string
  fullDescription: string
  imageUrls: string[]
  specifications: Specification[]
  features?: string[]
  applications?: string[]
  datasheetUrl: string | null
  featured: boolean
  published: boolean
  /** Owner review gate before a product can be publicly published. */
  reviewed?: boolean
  seoTitle?: string | null
  seoDescription?: string | null
  createdAt: string
  updatedAt: string
}

export interface QuoteRequest {
  id: string
  contactName: string
  companyName: string
  email: string
  phone: string
  preferredContact: "email" | "phone" | "whatsapp" | "in-person"
  deliveryLocation: string
  requestedItems: Array<{
    productId: string | null
    productName: string
    modelNumber: string | null
    quantity: number
    notes: string | null
  }>
  purchaseTimeline: string | null
  additionalNotes: string | null
  documentUrl: string | null
  status: "new" | "reviewing" | "supplier-enquiry" | "quotation-prepared" | "sent-to-customer" | "closed"
  createdAt: string
}
