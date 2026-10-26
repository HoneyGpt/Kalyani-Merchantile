import { getPublicCategories } from "@/lib/data"
import { CategoryCard } from "@/components/product/CategoryCard"

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
            Browse sourcing categories and example product types. Indicative reference counts are not stock or confirmed availability.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
