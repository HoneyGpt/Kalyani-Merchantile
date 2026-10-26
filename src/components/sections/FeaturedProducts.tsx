import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/product/ProductCard"

export function FeaturedProducts() {
  const { products, loading } = useProducts()
  const featured = products.filter((p) => p.featured)

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (featured.length === 0) return null

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3">Equipment &amp; Products</h2>
          <p className="text-slate">
            Explore selected products or submit a requirement for sourcing
            assistance.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSkeleton() {
  return (
    <article className="flex flex-col border border-border rounded-sm bg-white">
      <div className="aspect-[4/5] bg-ivory" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-4 bg-ivory rounded w-1/3 mb-2" />
        <div className="h-6 bg-ivory rounded mb-1" />
        <div className="h-4 bg-ivory rounded w-3/4 mb-4" />
        <div className="h-4 bg-ivory rounded w-full h-8 mt-auto" />
      </div>
    </article>
  )
}
