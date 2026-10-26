import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Boxes, ClipboardList } from "lucide-react"
import { SEO } from "@/components/SEO"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { getPublicCategories, getPublishedProducts } from "@/lib/data"

export function CategoryDetail() {
  const { slug = "" } = useParams()
  const category = getPublicCategories().find((item) => item.slug === slug)

  if (!category) return <Navigate to="/products" replace />

  const products = getPublishedProducts().filter((product) => product.categoryId === category.id)
  const types = category.subcategories || []

  return (
    <>
      <SEO
        title={`${category.name} — Sourcing Catalogue`}
        description={`Browse ${category.name} sourcing types and request a quotation for your business requirement.`}
        path={`/categories/${category.slug}`}
      />
      <main className="min-h-[65vh] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate">
            <Link to="/products" className="inline-flex items-center gap-2 hover:text-forest-dark">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Product catalogue
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-forest-dark" aria-current="page">{category.name}</span>
          </nav>

          <header className="rounded-sm border border-border bg-forest-dark px-6 py-9 text-white sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Sourcing category</p>
            <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{category.name}</h1>
                <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{category.description}</p>
              </div>
              {category.referenceCount && (
                <div className="shrink-0 border-l border-white/20 pl-4">
                  <p className="text-xl font-semibold text-gold">{category.referenceCount}</p>
                  <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-white/65">reference catalogue entries; not stock or confirmed availability</p>
                </div>
              )}
            </div>
          </header>

          <section className="mt-10" aria-labelledby="category-types-title">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">Explore the range</p>
                <h2 id="category-types-title" className="mt-1 text-2xl font-semibold text-forest-dark">Product types in {category.name}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-slate">These are sourcing types from the supplied catalogue reference. Tell us the exact specification and quantity you need.</p>
            </div>

            {types.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {types.map((type) => (
                  <li key={type} className="flex min-h-20 items-center justify-between gap-3 rounded-sm border border-border bg-white p-4 shadow-soft">
                    <span className="flex items-start gap-3 text-sm font-medium leading-relaxed text-forest-dark">
                      <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      {type}
                    </span>
                    <Link
                      to={`/contact?product=${encodeURIComponent(type)}`}
                      className="shrink-0 text-xs font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                      aria-label={`Request a quote for ${type}`}
                    >
                      Enquire
                    </Link>
                  </li>
                ))}
                {category.additionalTypeCount ? (
                  <li className="flex min-h-20 items-center rounded-sm border border-dashed border-gold/60 bg-ivory/40 p-4 text-sm leading-relaxed text-slate">
                    <span>+{category.additionalTypeCount} additional types are indicated in the supplied reference; their names were not included in the provided list.</span>
                  </li>
                ) : null}
              </ul>
            ) : (
              <div className="rounded-sm border border-border bg-ivory/40 p-6 text-sm leading-relaxed text-slate">
                Category-specific product types are still being verified. Share the product or model you need and we can review the sourcing requirement.
              </div>
            )}
          </section>

          <section className="mt-12 border-t border-border pt-10" aria-labelledby="published-products-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">Verified listings</p>
                <h2 id="published-products-title" className="mt-1 text-2xl font-semibold text-forest-dark">Published products</h2>
              </div>
              <span className="text-sm text-slate">{products.length} listing{products.length === 1 ? "" : "s"}</span>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="rounded-sm border border-border bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-forest-dark">No verified product listings published yet</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">The category range above helps describe sourcing requirements. Product-level details are shown only after they have been reviewed and published.</p>
                    <Button variant="forest" asChild className="mt-5">
                      <Link to={`/contact?product=${encodeURIComponent(category.name)}`}>
                        Request sourcing assistance <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <p className="mt-8 text-xs leading-relaxed text-slate/70">Reference category counts and product types are not live inventory, a price quote, or a guarantee of availability. Availability and specifications must be confirmed for each enquiry.</p>
        </div>
      </main>
    </>
  )
}
