import { useState, useEffect } from "react"
import {
  getPublishedProducts,
  getCategories,
  simulateDelay,
} from "@/lib/data"
import type { Product, Category } from "@/types/catalog"

interface UseProductsResult {
  products: Product[]
  categories: Category[]
  loading: boolean
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      await simulateDelay()
      if (cancelled) return
      setProducts(getPublishedProducts())
      setCategories(getCategories())
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { products, categories, loading }
}
