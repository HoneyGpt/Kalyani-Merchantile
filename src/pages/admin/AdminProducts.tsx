import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2, RefreshCw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getAllProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  simulateDelay,
} from "@/lib/data"
import type { Product, Category } from "@/types/catalog"

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(getAllProducts)
  const [categories, setCategories] = useState<Category[]>(getCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Product> & { id?: string }>({})
  const [specificationsText, setSpecificationsText] = useState("")
  const [featuresText, setFeaturesText] = useState("")
  const [applicationsText, setApplicationsText] = useState("")
  const [statusMsg, setStatusMsg] = useState<{ kind: "ok" | "bad"; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  // Demo data loads from localStorage, seeded from the demo catalogue.
  const load = () => {
    setProducts(getAllProducts())
    setCategories(getCategories())
  }

  const startEdit = (product: Product) => {
    setDraft({ ...product })
    setSpecificationsText(product.specifications.map((spec) => `${spec.name} | ${spec.value ?? ""}`).join("\n"))
    setFeaturesText((product.features || []).join("\n"))
    setApplicationsText((product.applications || []).join("\n"))
    setEditingId(product.id)
    document.getElementById("product-editor")?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const cancelEdit = () => {
    setDraft({})
    setSpecificationsText("")
    setFeaturesText("")
    setApplicationsText("")
    setEditingId(null)
  }

  const handleSave = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (!draft.name?.trim() || !draft.slug?.trim() || !draft.categoryId) {
      setStatusMsg({ kind: "bad", text: "Name, clean slug and category are required." })
      return
    }
    if (draft.published && draft.reviewed !== true) {
      setStatusMsg({ kind: "bad", text: "Review the product details and imagery before publishing." })
      return
    }
    setSaving(true)
    await simulateDelay(400)
    try {
      const product = {
        name: draft.name || "",
        slug: draft.slug || "",
        brand: draft.brand || null,
        modelNumber: draft.modelNumber || null,
        categoryId: draft.categoryId || "",
        shortDescription: draft.shortDescription || "",
        fullDescription: draft.fullDescription || "",
        imageUrls: draft.imageUrls ? [...draft.imageUrls] : [],
        specifications: specificationsText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [name, ...rest] = line.split("|")
            return { name: name.trim(), value: rest.join("|").trim() || null }
          }),
        features: featuresText.split("\n").map((line) => line.trim()).filter(Boolean),
        applications: applicationsText.split("\n").map((line) => line.trim()).filter(Boolean),
        datasheetUrl: draft.datasheetUrl || null,
        featured: draft.featured === true,
        published: draft.published === true,
        reviewed: draft.reviewed === true,
        seoTitle: draft.seoTitle || null,
        seoDescription: draft.seoDescription || null,
      } as Omit<Product, "id" | "createdAt" | "updatedAt">

      if (draft.id) {
        updateProduct(draft.id, product)
      } else {
        createProduct(product)
      }
      load()
      cancelEdit()
      setStatusMsg({ kind: "ok", text: "Product saved." })
    } catch {
      setStatusMsg({ kind: "bad", text: "Save failed." })
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (id: string, field: "published" | "featured") => {
    await simulateDelay(300)
    const product = products.find((p) => p.id === id)
    if (!product) return
    if (field === "published" && !product.published && product.reviewed !== true) {
      setStatusMsg({ kind: "bad", text: "Mark this product reviewed after verifying its brand, model, classification, description and permitted imagery before publishing." })
      return
    }
    updateProduct(id, { [field]: !product[field] })
    load()
    setStatusMsg({ kind: "ok", text: `${field} updated.` })
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product? Draft and published products will be removed.")) return
    await simulateDelay(300)
    deleteProduct(id)
    load()
    setStatusMsg({ kind: "ok", text: "Product deleted." })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-forest-dark">Catalogue Management</h2>
          <p className="text-slate">
            Demonstration mode — changes persist in browser storage only.
            Connect Supabase for a production backend.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="forest" size="sm" onClick={cancelEdit}>
            New Product
          </Button>
        </div>
      </div>

      {statusMsg && (
        <div className={`rounded-sm p-3 text-sm ${
          statusMsg.kind === "ok" ? "bg-green-50/60 text-forest-dark border border-green-100/60" : "bg-red-50/60 text-red-800 border border-red-100/60"
        }`}>{statusMsg.text}</div>
      )}

      <div className="rounded-sm border border-border bg-white shadow-soft overflow-x-auto">
        <table className="w-full min-w-[860px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-ivory/50">
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Product</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Brand / Model</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Category</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Status</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate/50">
                  No products yet. Add your first product below.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="py-5 px-6">
                    <div>
                      <div className="font-medium text-forest-dark">{product.name}</div>
                      <div className="text-[11px] text-slate/50">{product.slug}</div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-slate text-sm">
                    {product.brand || "—"} /{" "}
                    {product.modelNumber || "—"}
                  </td>
                  <td className="py-5 px-6 text-slate text-sm">
                    {categories.find((c) => c.id === product.categoryId)?.name || "—"}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold ${
                      product.published
                        ? "bg-green-50/60 text-forest-dark border border-green-100/60"
                        : "bg-slate-50 text-slate/60 border border-slate-100/60"
                    }`}>
                      {product.published ? "Published" : "Draft"}
                    </span>
                    <br />
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded mt-1.5 text-[10px] font-semibold ${
                      product.featured
                        ? "bg-gold/20 text-forest-dark border border-gold/40"
                        : "bg-slate-50 text-slate/50 border border-slate-100/60"
                    }`}>
                      {product.featured ? "Featured" : "Standard"}
                    </span>
                    <br />
                    <span className="mt-1.5 inline-flex rounded border border-border px-2 py-0.5 text-[10px] text-slate/60">
                      {product.reviewed ? "Reviewed" : "Review required"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggle(product.id, "published")}
                        className="text-[10px] px-3"
                      >
                        {product.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggle(product.id, "featured")}
                        className="text-[10px] px-3"
                      >
                        {product.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button variant="outline" size="sm" asChild className="text-[10px] px-3 text-slate">
                        <Link to={`/admin/products/preview/${product.slug}`}><Eye className="mr-1 h-3 w-3" />Preview</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(product)}
                        className="text-[10px] px-3 text-slate"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-[10px] px-3 text-destructive"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div id="product-editor" className="rounded-sm border border-border bg-white shadow-soft p-6">
        <h3 className="text-sm font-semibold uppercase tracking-tighter text-slate/60 mb-4">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Name</label>
            <input
              name="name"
              required
              value={draft.name || ""}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Slug</label>
            <input
              name="slug"
              required
              value={draft.slug || ""}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Brand</label>
            <input
              name="brand"
              value={draft.brand || ""}
              onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Model number</label>
            <input
              name="modelNumber"
              value={draft.modelNumber || ""}
              onChange={(e) => setDraft({ ...draft, modelNumber: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Category</label>
            <select
              name="categoryId"
              required
              value={draft.categoryId || ""}
              onChange={(e) => setDraft({ ...draft, categoryId: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest bg-white"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Short description</label>
            <input
              name="shortDescription"
              value={draft.shortDescription || ""}
              onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Full description</label>
            <textarea
              name="fullDescription"
              value={draft.fullDescription || ""}
              onChange={(e) => setDraft({ ...draft, fullDescription: e.target.value })}
              rows={3}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Specifications — one per line: name | verified value</label>
            <textarea
              value={specificationsText}
              onChange={(e) => setSpecificationsText(e.target.value)}
              rows={4}
              placeholder={"Power type | Electric\nMaximum platform height | (leave blank until verified)"}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
            <p className="text-xs text-slate/50">Only add values supported by current manufacturer documentation. Leave unknown values blank.</p>
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Verified product features — one per line</label>
            <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={3} className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest" />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Verified applications — one per line</label>
            <textarea value={applicationsText} onChange={(e) => setApplicationsText(e.target.value)} rows={3} className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest" />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Image URLs (comma separated)</label>
            <input
              name="imageUrls"
              value={draft.imageUrls?.join(", ") || ""}
              onChange={(e) => setDraft({ ...draft, imageUrls: e.target.value.split(",").map((url) => url.trim()).filter(Boolean) })}
              placeholder="/images/products/front.jpg, /images/products/side.jpg"
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">Datasheet URL</label>
            <input
              name="datasheetUrl"
              value={draft.datasheetUrl || ""}
              onChange={(e) => setDraft({ ...draft, datasheetUrl: e.target.value })}
              placeholder="https://example.com/datasheet.pdf"
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">SEO title (optional)</label>
            <input
              value={draft.seoTitle || ""}
              onChange={(e) => setDraft({ ...draft, seoTitle: e.target.value })}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label className="text-[10px] font-semibold uppercase tracking-tighter text-slate/60 block">SEO description (optional)</label>
            <textarea
              value={draft.seoDescription || ""}
              onChange={(e) => setDraft({ ...draft, seoDescription: e.target.value })}
              rows={2}
              className="w-full border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm font-medium text-slate cursor-pointer select-none">
              <input
                type="checkbox"
                checked={draft.published === true}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="rounded border-border text-forest focus:ring-forest"
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate cursor-pointer select-none">
              <input
                type="checkbox"
                checked={draft.featured === true}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="rounded border-border text-forest focus:ring-forest"
              />
              Featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate cursor-pointer select-none">
              <input
                type="checkbox"
                checked={draft.reviewed === true}
                onChange={(e) => setDraft({ ...draft, reviewed: e.target.checked })}
                className="rounded border-border text-forest focus:ring-forest"
              />
              Verified details and approved imagery reviewed
            </label>
          </div>
          <div className="sm:col-span-2 flex gap-3">
            <Button type="submit" variant="forest" disabled={saving}>
              {saving ? "Saving…" : "Save Product"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="border-t border-border pt-6 mt-8 text-xs text-slate/50">
        Published products appear on /products and their detail pages at
        /products/:slug. Draft products are hidden from the public site but can
        be previewed by administrators.
      </div>
    </div>
  )
}
