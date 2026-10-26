import { useState, useMemo, useEffect, useId } from "react"
import { SEO } from "@/components/SEO"
import { Link, useSearchParams } from "react-router-dom"
import { Search, X, SlidersHorizontal, ArrowRight, ChevronDown } from "lucide-react"
import { ProductCard } from "@/components/product/ProductCard"
import { getPublishedProducts, getPublicCategories } from "@/lib/data"

export function Products() {
  const seo = (
    <SEO
      title="Product Catalogue — Industrial Equipment & Supplies"
      description="Browse equipment and supplies, explore available product information, or request a quotation for your business requirement."
      path="/products"
    />
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [brand, setBrand] = useState(searchParams.get("brand") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "featured")

  const allProducts = getPublishedProducts()
  const allCategories = getPublicCategories()

  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand).filter(Boolean))] as string[],
    [allProducts]
  )

  const filtered = useMemo(() => {
    let result = allProducts

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          (allCategories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(q) ?? false) ||
          p.name.toLowerCase().includes(q) ||
          (p.modelNumber && p.modelNumber.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specifications.some(
            (s) => s.value && s.value.toLowerCase().includes(q)
          )
      )
    }
    if (category) result = result.filter((p) => p.categoryId === category)
    if (brand) result = result.filter((p) => p.brand === brand)

    result = [...result].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name)
      if (sort === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
        a.name.localeCompare(b.name)
    })
    return result
  }, [allProducts, allCategories, query, category, brand, sort])

  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString())
    if (query) next.set("q", query)
    else next.delete("q")
    if (category) next.set("category", category)
    else next.delete("category")
    if (brand) next.set("brand", brand)
    else next.delete("brand")
    next.set("sort", sort)
    setSearchParams(next, { replace: true })
  }, [query, category, brand, sort, searchParams, setSearchParams])

  const activeFilters: Array<{ label: string; value: string; onRemove: () => void }> = []
  if (query) {
    activeFilters.push({ label: "Search", value: query, onRemove: () => setQuery("") })
  }
  if (category) {
    activeFilters.push({
      label: "Category",
      value: allCategories.find((c) => c.slug === category)?.name || category,
      onRemove: () => setCategory(""),
    })
  }
  if (brand) {
    activeFilters.push({ label: "Brand", value: brand, onRemove: () => setBrand("") })
  }


  return (
    <>
      {seo}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <CatalogueHeader
          total={allProducts.length}
          showing={filtered.length}
          activeFilters={activeFilters}
          onClearAll={() => {
            setQuery("")
            setCategory("")
            setBrand("")
            setSort("featured")
          }}
        />
        <CategoryBrowser categories={allCategories} query={query} activeCategory={category} />
        <div className="lg:hidden mt-8 border-t border-border pt-6">
          <Filters
            categories={allCategories}
            brands={brands}
            category={category}
            brand={brand}
            sort={sort}
            onCategory={setCategory}
            onBrand={setBrand}
            onSort={setSort}
          />
        </div>
        <div className="grid grid-cols-12 gap-8 mt-12">
          <aside className="lg:col-span-3 hidden lg:block">
            <Filters
              categories={allCategories}
              brands={brands}
              category={category}
              brand={brand}
              sort={sort}
              onCategory={setCategory}
              onBrand={setBrand}
              onSort={setSort}
            />
          </aside>
          <div className="col-span-12 lg:col-span-9">
            <SearchBar
              query={query}
              onChange={(e) => setQuery(e.target.value)}
              onReset={() => setQuery("")}
            />
            {filtered.length === 0 ? (
              <EmptyState
                onClearSearch={() => {
                  setQuery("")
                  setCategory("")
                  setBrand("")
                }}
                noPublishedProducts={allProducts.length === 0}
              />
            ) : (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <p className="mt-8 text-slate text-sm">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {filtered.length > 0 && ` matching your selection`}
            </p>
          </div>
          </div>
        </div>
      </section>
      </>
  )
}

function CatalogueHeader({
  total,
  showing,
  activeFilters,
  onClearAll,
}: {
  total?: number
  showing?: number
  activeFilters: Array<{ label: string; value: string; onRemove: () => void }>
  onClearAll?: () => void
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-2">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Product Catalogue</h1>
        <p className="text-slate mt-2">
          Browse equipment and supplies, explore available product information,
          or request a quotation for your business requirement.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {total != null && (
          <span className="text-sm text-slate">
            {showing ?? total} of {total} published products
          </span>
        )}
        <div className="flex flex-wrap gap-2 bg-ivory/50 border border-border rounded-sm p-2.5">
          {activeFilters.map((filter, idx) => (
            <Chip
              key={idx}
              label={filter.label}
              value={filter.value}
              onRemove={filter.onRemove}
            />
          ))}
          {activeFilters.length > 0 && onClearAll && (
            <button
              onClick={onClearAll}
              className="text-[10px] font-semibold text-gold-ink uppercase hover:text-forest-dark transition-colors underline decoration-gold/40 decoration-1 underline-offset-4"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CategoryBrowser({
  categories,
  query,
  activeCategory,
}: {
  categories: ReturnType<typeof getPublicCategories>
  query: string
  activeCategory: string
}) {
  const categoryMatches = categories.filter((item) => {
    const searchable = [item.name, item.description, ...(item.subcategories || [])].join(" ").toLowerCase()
    return (!activeCategory || item.slug === activeCategory) && (!query || searchable.includes(query.toLowerCase()))
  })

  return (
    <section className="mt-10 rounded-sm border border-border bg-ivory/40 p-5 sm:p-7" aria-labelledby="category-browser-title">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="category-browser-title" className="text-xl font-semibold text-forest-dark">Browse product categories</h2>
          <p className="mt-1 text-sm text-slate">Example product types from the supplied reference catalogue; items are sourced against each requirement.</p>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-slate/70">Reference catalogue counts indicate breadth only. They are not Kalyani stock, live listings or a promise of availability.</p>
      </div>
      {categoryMatches.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categoryMatches.map((item) => (
            <Link
              key={item.id}
              to={`/products?category=${item.slug}`}
              className="group rounded-sm border border-border bg-white p-4 transition-colors hover:border-gold/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-current={activeCategory === item.slug ? "page" : undefined}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold leading-snug text-forest-dark">{item.name}</span>
                <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold-ink transition-transform group-hover:translate-x-1" />
              </span>
              {item.referenceCount && <span className="mt-1 block text-[11px] text-gold-ink">{item.referenceCount} reference entries</span>}
              <span className="mt-2 block text-xs leading-relaxed text-slate/80">
                {item.subcategories?.length ? item.subcategories.slice(0, 8).join(" · ") : item.description}
                {item.additionalTypeCount ? ` · +${item.additionalTypeCount} more product types` : !!item.subcategories?.length && item.subcategories.length > 8 ? ` · +${item.subcategories.length - 8} more types` : ""}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-sm border border-border bg-white p-5 text-sm text-slate">No categories match that search. Try a broader term or clear the search.</p>
      )}
    </section>
  )
}

function Chip({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-2 bg-white border border-border rounded-full px-2.5 py-1.5 text-[10px] font-semibold text-slate">
      <span className="uppercase tracking-tighter">{label}</span>
      <span className="truncate mx-1 max-w-[120px]">{value}</span>
      <button
        onClick={(e) => {
          e.preventDefault()
          onRemove()
        }}
        className="text-slate/50 hover:text-forest transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

function SearchBar({
  query,
  onChange,
  onReset,
}: {
  query: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
      <input
        type="search"
        placeholder="Search by product name, model, brand or category"
        value={query}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 border border-border rounded-sm bg-white text-slate focus:outline-none focus:ring-1 focus:ring-forest transition-all"
        aria-label="Search products"
      />
      {query && (
        <button
          onClick={onReset}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 hover:text-forest transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

function Filters({
  categories,
  brands,
  category,
  brand,
  sort,
  onCategory,
  onBrand,
  onSort,
}: {
  categories: { slug: string; name: string }[]
  brands: string[]
  category: string
  brand: string
  sort: string
  onCategory: (v: string) => void
  onBrand: (v: string) => void
  onSort: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <SlidersHorizontal className="w-4 h-4 text-gold-ink shrink-0" />
        <h3 className="text-xs font-semibold uppercase tracking-tighter text-slate">
          Filters
        </h3>
      </div>
      <FilterSelect
        label="Category"
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        options={[
          { value: "", label: "All categories" },
          ...categories.map((c) => ({ value: c.slug, label: c.name })),
        ]}
      />
      <FilterSelect
        label="Brand"
        value={brand}
        onChange={(e) => onBrand(e.target.value)}
        options={[
          { value: "", label: "All brands" },
          ...brands.map((b) => ({ value: b, label: b })),
        ]}
      />
      <FilterSelect
        label="Sort by"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        options={[
          { value: "featured", label: "Featured" },
          { value: "name", label: "Product name A–Z" },
          { value: "recent", label: "Recently added" },
        ]}
      />
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ value: string; label: string }>
}) {
  const id = useId()
  return (
    <div className="relative space-y-2">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-border bg-white py-3 pl-3 pr-9 text-sm text-slate transition-all appearance-none focus:outline-none focus:ring-1 focus:ring-forest"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 bottom-3.5 h-4 w-4 text-slate/40" aria-hidden="true" />
    </div>
  )
}

function EmptyState({
  onClearSearch,
  noPublishedProducts,
}: {
  onClearSearch: () => void
  noPublishedProducts: boolean
}) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center text-center py-16 px-6 border border-border rounded-sm bg-ivory/50">
      <h3 className="text-lg font-semibold text-forest-dark mb-2">
        {noPublishedProducts ? "Product details are being verified." : "No products match your search."}
      </h3>
      <p className="text-slate mb-6 max-w-md">
        {noPublishedProducts
          ? "Category names and example product types are available above. Product-level listings are being verified before publication; you can still share a sourcing requirement."
          : "Adjust your filters or search terms, and try again."}
      </p>
      <button
        onClick={onClearSearch}
        className="text-sm font-medium text-gold-ink hover:text-forest-dark transition-colors underline decoration-gold/40 decoration-1 underline-offset-4"
      >
        Clear all filters
      </button>
      <div className="mt-10 border-t border-border pt-8 w-full">
        <h4 className="text-lg font-semibold text-forest-dark mb-4">
          Can&rsquo;t find what you need?
        </h4>
        <p className="text-slate text-sm mb-6 max-w-md">
          Submit a custom sourcing requirement and we&rsquo;ll help you locate
          the product.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline"
        >
          Submit a sourcing request <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

