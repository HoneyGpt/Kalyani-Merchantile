import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SEO } from "@/components/SEO"
import { getPublicCategories, getPublishedProducts } from "@/lib/data"

export function CategoryDetail() {
  const { slug = "" } = useParams()
  const category = getPublicCategories().find((item) => item.slug === slug)

  if (!category) return <Navigate to="/products" replace />

  const products = getPublishedProducts().filter((product) => product.categoryId === category.id)
  const types = category.subcategories || []
  const enquiryFor = (name: string) => `/contact?product=${encodeURIComponent(name)}`

  return (
    <>
      <SEO
        title={`${category.name} — Product Catalogue`}
        description={`Explore ${category.name} products and request a quotation for your business requirement.`}
        path={`/categories/${category.slug}`}
      />
      <main className="min-h-[65vh] bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate">
            <Link to="/products" className="inline-flex items-center gap-2 hover:text-forest-dark">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Product catalogue
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-forest-dark" aria-current="page">{category.name}</span>
          </nav>

          <header className="mb-9 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">Kalyani Mercantile · Product Range</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{category.name}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">{category.description}</p>
          </header>

          <section aria-labelledby="category-products-title" className="rounded-sm border border-border bg-white px-5 py-6 shadow-soft sm:px-8 sm:py-8">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
              <h2 id="category-products-title" className="text-lg font-semibold uppercase tracking-[0.12em] text-forest-dark sm:text-xl">Products</h2>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <ul className="divide-y divide-border">
              {types.map((type) => (
                <li key={type} className="flex flex-col gap-3 py-5 first:pt-2 last:pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium leading-snug text-forest-dark sm:text-lg">{type}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">Tell us the specification and quantity you need for a tailored quotation.</p>
                  </div>
                  <Link
                    to={enquiryFor(type)}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                    aria-label={`Request a quote for ${type}`}
                  >
                    Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}

              {products.map((product) => (
                <li key={product.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium leading-snug text-forest-dark sm:text-lg">{product.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{product.shortDescription}</p>
                    {product.modelNumber && <p className="mt-1 text-xs text-slate/70">Model: {product.modelNumber}</p>}
                  </div>
                  <Link
                    to={enquiryFor(product.name)}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  >
                    Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}

              {category.additionalTypeCount ? (
                <li className="flex flex-col gap-3 py-5 last:pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-base font-medium leading-snug text-forest-dark sm:text-lg">More {category.name} products</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{category.additionalTypeCount} more product types in this range. Share the name or specification you’re looking for.</p>
                  </div>
                  <Link to={enquiryFor(category.name)} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 hover:text-forest-dark">
                    Enquire <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ) : null}
            </ul>
          </section>

          <section className="mt-8 flex flex-col items-start justify-between gap-4 rounded-sm bg-forest-dark p-6 text-white sm:flex-row sm:items-center sm:p-7">
            <div>
              <h2 className="text-xl font-semibold text-white">Need a different product?</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/75">Our sourcing range goes beyond these lists. Send any business or project requirement.</p>
            </div>
            <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-forest-dark hover:bg-white">
              Share your requirement <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
