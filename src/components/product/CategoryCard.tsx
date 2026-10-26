import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Boxes } from "lucide-react"
import type { Category } from "@/types/catalog"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <article className="group relative flex flex-col border border-border rounded-sm bg-white shadow-soft transition-all duration-200">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        {imageFailed ? (
          <div className="h-full w-full flex items-center justify-center bg-ivory text-forest/35" aria-label="Category image unavailable">
            <Boxes className="w-12 h-12" strokeWidth={1.2} />
          </div>
        ) : (
          <img
            src={category.image}
            alt={category.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-refined"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold leading-tight text-forest-dark">
          {category.name}
        </h3>
        <p className="text-slate text-sm leading-relaxed mt-2 line-clamp-2">
          {category.description}
        </p>
        {category.subcategories && category.subcategories.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed text-slate/75 line-clamp-3">
            {category.subcategories.slice(0, 4).join(" · ")}
            {category.additionalTypeCount ? ` · +${category.additionalTypeCount} more product types` : category.subcategories.length > 4 ? ` · +${category.subcategories.length - 4} more types` : ""}
          </p>
        )}
        {category.referenceCount && (
          <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-gold-ink">
            {category.referenceCount} reference catalogue entries
          </p>
        )}
      </div>
      <div className="p-5 pt-0 border-t border-border flex items-center justify-between">
        <Link
          to={`/products?category=${category.slug}`}
          className="text-xs font-semibold text-gold-ink hover:text-forest-dark transition-colors flex items-center gap-1"
        >
          Explore category <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  )
}
