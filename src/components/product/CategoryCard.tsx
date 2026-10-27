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
    <Link
      to={`/categories/${category.slug}`}
      className="group relative flex flex-col rounded-sm border border-border bg-white shadow-soft transition-all duration-200 hover:border-gold/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      aria-label={`Open ${category.name} category`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-ivory text-forest/35" aria-hidden="true">
            <Boxes className="h-12 w-12" strokeWidth={1.2} />
          </div>
        ) : (
          <img
            src={category.image}
            alt=""
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-refined group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-tight text-forest-dark">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{category.description}</p>
        {category.subcategories && category.subcategories.length > 0 && (
          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate/75">
            {category.subcategories.slice(0, 4).join(" · ")}
            {category.additionalTypeCount
              ? ` · +${category.additionalTypeCount} more product types`
              : category.subcategories.length > 4
                ? ` · +${category.subcategories.length - 4} more types`
                : ""}
          </p>
        )}
        {category.referenceCount && (
          <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-gold-ink">
            {category.referenceCount} catalogue options
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border p-5 pt-4">
        <span className="text-xs font-semibold text-gold-ink transition-colors group-hover:text-forest-dark">
          View category and items
        </span>
        <ArrowRight className="h-4 w-4 text-gold-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  )
}
