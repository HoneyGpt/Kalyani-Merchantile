import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getPublishedProductBySlug, getPublicCategories, getPublishedProducts } from "@/lib/data"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { Download, Package } from "lucide-react"
import { SEO } from "@/components/SEO"

export function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const categories = getPublicCategories()
  const product = slug ? getPublishedProductBySlug(slug) : undefined
  const category = product
    ? categories.find((c) => c.id === product.categoryId)
    : undefined
  const selectedProductImage = product
    ? selectedImage && product.imageUrls.includes(selectedImage)
      ? selectedImage
      : product.imageUrls[0]
    : undefined
  const imageFailed = failedImageUrl === selectedProductImage

  const seo = product
    ? {
        title: product.seoTitle || `${product.name}${product.brand ? ` — ${product.brand}` : ""}${product.modelNumber ? ` (${product.modelNumber})` : ""}`,
        description: product.seoDescription || product.shortDescription,
        path: `/products/${product.slug}`,
        image: product.imageUrls[0],
      }
    : { title: "Product not found", description: "", path: "/products" }

  if (!product) {
    return (
      <>
      <SEO title="Product not found" description="The requested product is not available in the published catalogue." path="/products" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Product not found</h2>
          <p className="text-slate mt-4">The requested product is not available.</p>
          <Button variant="forest" asChild onClick={() => navigate("/products")}>
            <Link to="/products">Browse Catalogue</Link>
          </Button>
        </div>
      </section>
      </>
    )
  }

  const related = getPublishedProducts()
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3)

  const specsWithValues = product.specifications.filter((s) => s.value)
  const hasImages = product.imageUrls.length > 1

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {seo && <SEO title={seo.title} description={seo.description} path={seo.path} image={seo.image} />}
        {/* Breadcrumbs */}
        <nav className="mb-8 text-xs text-slate/60">
          <ol className="flex flex-wrap gap-2 text-slate/60">
            <li>
              <Link to="/" className="hover:text-forest transition-colors underline decoration-gold/40 decoration-1 underline-offset-4">
                Home
              </Link>
            </li>
            <li>
              <span aria-hidden="true">&rsaquo;</span>
              <Link
                to="/products"
                className="hover:text-forest transition-colors underline decoration-gold/40 decoration-1 underline-offset-4"
              >
                Product Catalogue
              </Link>
            </li>
            {category && (
              <>
                <li>
                  <span aria-hidden="true">&rsaquo;</span>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="hover:text-forest transition-colors underline decoration-gold/40 decoration-1 underline-offset-4"
                  >
                    {category.name}
                  </Link>
                </li>
                <li>
                  <span aria-hidden="true">&rsaquo;</span>
                  <span className="text-forest-dark">{product.name}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-ivory shadow-soft">
              {selectedProductImage && !imageFailed ? (
                <img
                  src={selectedProductImage}
                  alt={`${product.brand ? `${product.brand} ` : ""}${product.modelNumber || product.name}`}
                  onError={() => setFailedImageUrl(selectedProductImage)}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-forest/35" aria-label="Product image unavailable">
                  <Package className="w-16 h-16" strokeWidth={1.2} />
                </div>
              )}
            </div>
            {hasImages && (
              <div className="flex gap-3 overflow-x-auto pb-1" aria-label="Product image gallery">
                {product.imageUrls.map((imageUrl, index) => (
                  <button
                    key={`${imageUrl}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(imageUrl)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedProductImage === imageUrl}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-sm border ${selectedProductImage === imageUrl ? "border-forest" : "border-border"}`}
                  >
                    <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.visibility = "hidden" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              {product.brand && (
                <span className="text-xs font-semibold tracking-wider text-gold-ink uppercase">
                  {product.brand}
                </span>
              )}
              {product.modelNumber && (
                <span className="text-xs font-semibold tracking-wider text-slate/50 uppercase">
                  Model {product.modelNumber}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-slate text-lg leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            <Button
              variant="forest"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                const params = new URLSearchParams({
                  product: product.name,
                })
                if (product.modelNumber) {
                  params.set("model", product.modelNumber)
                }
                navigate(`/contact?${params.toString()}`)
              }}
            >
              Request a Quote
            </Button>

            {/* Overview */}
            <div className="mt-12 mb-10">
              <h2 className="text-xl font-semibold mb-4">Product overview</h2>
              <p className="text-slate leading-relaxed max-w-2xl">
                {product.fullDescription}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <section className="mb-10" aria-labelledby="product-features-heading">
                <h2 id="product-features-heading" className="text-xl font-semibold mb-4">Product features</h2>
                <ul className="list-disc space-y-2 pl-5 text-slate text-sm leading-relaxed">
                  {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
            )}
            {product.applications && product.applications.length > 0 && (
              <section className="mb-10" aria-labelledby="product-applications-heading">
                <h2 id="product-applications-heading" className="text-xl font-semibold mb-4">Applications</h2>
                <ul className="list-disc space-y-2 pl-5 text-slate text-sm leading-relaxed">
                  {product.applications.map((application) => <li key={application}>{application}</li>)}
                </ul>
              </section>
            )}

            {/* Specifications */}
            <div id="specifications" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-semibold mb-4">Technical specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-slate/60 font-medium uppercase text-[10px] tracking-wider w-1/3">
                        Specification
                      </th>
                      <th className="pb-3 text-slate/60 font-medium uppercase text-[10px] tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specsWithValues.length > 0 ? (
                      specsWithValues.map((spec) => (
                        <tr key={spec.name} className="border-b border-border/50 last:border-0">
                          <td className="py-4 text-slate font-medium">{spec.name}</td>
                          <td className="py-4 text-slate">{spec.value}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-8 text-slate/50 text-center" colSpan={2}>
                          Technical specifications are to be confirmed against
                          manufacturer documentation.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate/50">
                Values shown are indicative only and must be confirmed with the
                supplier before any purchasing decision.
              </p>
            </div>

            {/* Datasheet */}
            {product.datasheetUrl && (
              <div className="mb-10">
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold-ink hover:text-forest-dark transition-colors"
                >
                  <Download className="w-4 h-4" /> Download datasheet
                </a>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-6">Related products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
