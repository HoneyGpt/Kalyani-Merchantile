import { getPublicCategories } from "@/lib/data"
import { CategoryCard } from "@/components/product/CategoryCard"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function CategoryGrid() {
  // Category visibility is controlled by configuration/admin data.
  const categories = getPublicCategories()
  if (categories.length === 0) return null

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3">Explore Our Product Categories</h2>
          <p className="text-slate">
            From industrial and food-processing supplies to road materials and stationery, browse our sourcing range. Need something else? Tell us what your business needs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-sm border border-gold/30 bg-ivory/50 p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-forest-dark">Need something outside these categories?</h3>
            <p className="mt-1 text-sm text-slate">Send any business or project requirement—we’ll explore suitable sourcing options.</p>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-ink hover:text-forest-dark">
            Share a requirement <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
