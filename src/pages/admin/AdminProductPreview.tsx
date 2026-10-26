import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Package } from "lucide-react"
import { getCategories, getProductBySlug } from "@/lib/data"
import { Button } from "@/components/ui/button"

export function AdminProductPreview() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const category = product ? getCategories().find((item) => item.id === product.categoryId) : undefined

  if (!product) {
    return <section className="p-8"><h2 className="text-xl font-semibold">Product not found</h2><Button asChild variant="outline" className="mt-4"><Link to="/admin/products">Back to products</Link></Button></section>
  }

  return (
    <article className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-ink">Admin preview · not public</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-sm text-slate">{product.published ? "Published" : "Draft"} · {product.reviewed ? "Review marked complete" : "Product review still required"}</p>
        </div>
        <Button variant="outline" asChild><Link to="/admin/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to products</Link></Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-sm border border-border bg-ivory">
          {product.imageUrls[0] ? <img src={product.imageUrls[0]} alt={`${product.brand || ""} ${product.modelNumber || product.name}`.trim()} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-forest/40"><Package className="h-14 w-14" /></div>}
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{product.brand || "Brand to confirm"} {product.modelNumber ? `· ${product.modelNumber}` : ""}</p>
          <p className="text-sm text-slate">{category?.name || "Category to confirm"}</p>
          <p className="text-slate leading-relaxed">{product.shortDescription || "Add a factual summary before publication."}</p>
          <p className="text-sm text-slate leading-relaxed">{product.fullDescription}</p>
          <p className="border-t border-border pt-4 text-sm font-medium text-forest">Pricing: Request pricing</p>
        </div>
      </div>
      <section>
        <h2 className="text-xl font-semibold">Specifications</h2>
        <div className="mt-4 overflow-x-auto rounded-sm border border-border">
          <table className="w-full min-w-[420px] text-left text-sm">
            <tbody>
              {product.specifications.filter((spec) => spec.value).map((spec) => (
                <tr key={spec.name} className="border-b border-border last:border-0">
                  <th className="p-3 font-medium text-slate">{spec.name}</th>
                  <td className="p-3 text-slate">{spec.value}</td>
                </tr>
              ))}
              {!product.specifications.some((spec) => spec.value) && <tr><td className="p-4 text-slate/60">No verified specifications entered.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
