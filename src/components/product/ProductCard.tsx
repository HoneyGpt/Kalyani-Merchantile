import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/catalog"
import { getCategories } from "@/lib/data"

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const image = product.imageUrls[0]
  const category = getCategories().find((item) => item.id === product.categoryId)
  const brandLabel = product.brand ? `${product.brand}` : null
  const modelLabel = product.modelNumber ? `Model ${product.modelNumber}` : null

  return (
    <article
      className={cn(
        "flex flex-col h-full border border-border rounded-sm bg-white shadow-soft transition-all duration-200 refined group",
        compact ? "h-auto" : "h-full"
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        {image && !imageFailed ? (
          <img
            src={image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-refined"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-ivory text-forest/35" aria-label="Product image unavailable">
            <Package className="w-12 h-12" strokeWidth={1.2} />
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
          {brandLabel && (
            <span className="text-[10px] font-semibold tracking-wider text-gold-ink uppercase">
              {brandLabel}
            </span>
          )}
          {modelLabel && (
            <span className="text-[10px] font-semibold tracking-wider text-slate/50 uppercase">
              {modelLabel}
            </span>
          )}
        </div>
        {category && (
          <span className="text-[10px] text-slate/60 uppercase tracking-wide mb-2">{category.name}</span>
        )}
        <Link
          to={`/products/${product.slug}`}
          className="text-forest-dark font-semibold leading-tight group-hover:underline text-underline-offset-4"
        >
          {product.name}
        </Link>
        <p className="text-slate text-sm leading-relaxed mt-2.5 line-clamp-2">
          {product.shortDescription}
        </p>
        <p className="mt-3 text-[11px] font-medium text-slate/60">Request pricing</p>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <Link
            to={`/products/${product.slug}#specifications`}
            className="text-xs font-medium text-gold-ink hover:text-forest-dark transition-colors flex items-center gap-1"
          >
            View specifications <ArrowRight className="w-3 h-3" />
          </Link>
          <ButtonQuote asChild>
            <Link
              to={`/contact?${new URLSearchParams({ product: product.name, ...(product.modelNumber ? { model: product.modelNumber } : {}) }).toString()}`}
            >
              Request a quote
            </Link>
          </ButtonQuote>
        </div>
      </div>
    </article>
  )
}

import { Button } from "@/components/ui/button"
type ButtonQuoteProps = React.ComponentProps<typeof Button>
function ButtonQuote({ children, ...props }: ButtonQuoteProps) {
  return <Button {...props} variant="forest" size="sm" asChild>{children}</Button>
}
