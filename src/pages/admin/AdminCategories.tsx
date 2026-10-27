import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCategories, saveAllCategories, simulateDelay } from "@/lib/data"
import type { Category } from "@/types/catalog"

const emptyDraft: Partial<Category> = {
  name: "",
  slug: "",
  description: "",
  image: "",
  hidden: false,
}

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(getCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Category>>(emptyDraft)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const reset = () => {
    setDraft({ ...emptyDraft })
    setEditingId(null)
  }

  const startEdit = (category: Category) => {
    setDraft({ ...category })
    setEditingId(category.id)
    document.getElementById("category-editor")?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!draft.name?.trim() || !draft.slug?.trim()) {
      setStatusMsg("Enter a category name and slug before saving.")
      return
    }
    setSaving(true)
    await simulateDelay(250)
    const next: Category = {
      id: editingId || `cat-${Date.now()}`,
      name: draft.name.trim(),
      slug: draft.slug.trim(),
      description: draft.description?.trim() || "",
      image: draft.image?.trim() || "/images/categories/general-business-procurement.jpg",
      subcategories: draft.subcategories || [],
      referenceCount: draft.referenceCount?.trim() || undefined,
      additionalTypeCount: draft.additionalTypeCount,
      hidden: draft.hidden === true,
    }
    const updated = editingId
      ? categories.map((category) => (category.id === editingId ? next : category))
      : [...categories, next]
    saveAllCategories(updated)
    setCategories(updated)
    setStatusMsg("Category saved in this browser's demo storage.")
    setSaving(false)
    reset()
  }

  const toggleHidden = (id: string) => {
    const updated = categories.map((category) =>
      category.id === id ? { ...category, hidden: !category.hidden } : category
    )
    saveAllCategories(updated)
    setCategories(updated)
  }

  const remove = (id: string) => {
    if (!window.confirm("Remove this category from the demo catalogue?")) return
    const updated = categories.filter((category) => category.id !== id)
    saveAllCategories(updated)
    setCategories(updated)
    if (editingId === id) reset()
    setStatusMsg("Category removed from this browser's demo storage.")
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-forest-dark">Category Management</h2>
          <p className="text-slate mt-2 max-w-2xl">
            Manage public sourcing categories, example product types and catalogue descriptions. Hide any category you do not want shown publicly.
          </p>
        </div>
        <Button variant="forest" size="sm" onClick={reset}>Add category</Button>
      </header>

      {statusMsg && (
        <p role="status" className="rounded-sm border border-border bg-ivory px-4 py-3 text-sm text-slate">
          {statusMsg}
        </p>
      )}

      <div className="overflow-x-auto rounded-sm border border-border bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-ivory/50">
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Category</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Slug</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Public</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-ivory/30">
                <td className="py-4 px-6">
                  <div className="font-medium text-forest-dark">{category.name}</div>
                  <div className="text-xs text-slate/60">{category.description}</div>
                </td>
                <td className="py-4 px-6 text-sm text-slate">{category.slug}</td>
                <td className="py-4 px-6 text-center text-xs">{category.hidden ? "Hidden" : "Visible"}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleHidden(category.id)}>
                      {category.hidden ? "Show" : "Hide"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startEdit(category)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => remove(category.id)} aria-label={`Remove ${category.name}`}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form id="category-editor" onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-sm border border-border bg-white p-6 shadow-soft">
        <h3 className="sm:col-span-2 text-lg font-semibold text-forest-dark">{editingId ? "Edit category" : "Add a category"}</h3>
        <Field label="Name" value={draft.name || ""} onChange={(name) => setDraft({ ...draft, name })} required />
        <Field label="Slug" value={draft.slug || ""} onChange={(slug) => setDraft({ ...draft, slug })} required />
        <Field label="Description" value={draft.description || ""} onChange={(description) => setDraft({ ...draft, description })} />
        <Field label="Image path or URL" value={draft.image || ""} onChange={(image) => setDraft({ ...draft, image })} placeholder="/images/categories/example.jpg" />
        <Field label="Reference catalogue count (optional)" value={draft.referenceCount || ""} onChange={(referenceCount) => setDraft({ ...draft, referenceCount })} placeholder="e.g. 3,359+" />
        <Field label="Additional product types (optional)" value={draft.additionalTypeCount == null ? "" : String(draft.additionalTypeCount)} onChange={(value) => setDraft({ ...draft, additionalTypeCount: value.trim() ? Number(value) : undefined })} placeholder="e.g. 32" />
        <label className="sm:col-span-2 block space-y-2 text-xs font-semibold uppercase tracking-wide text-slate/70">
          Example product types (one per line)
          <textarea
            rows={4}
            value={(draft.subcategories || []).join("\n")}
            onChange={(event) => setDraft({ ...draft, subcategories: event.target.value.split(/\n/).map((item) => item.trim()).filter(Boolean) })}
            className="block w-full rounded-sm border border-border bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-slate focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </label>
        <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-slate">
          <input type="checkbox" checked={draft.hidden === true} onChange={(e) => setDraft({ ...draft, hidden: e.target.checked })} />
          Hide this category from the public catalogue
        </label>
        <div className="sm:col-span-2 flex gap-3">
          <Button type="submit" variant="forest" disabled={saving}>{saving ? "Saving…" : editingId ? "Save changes" : "Add category"}</Button>
          {editingId && <Button type="button" variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </form>
      <p className="text-xs text-slate/60">Demo mode only: category changes are stored in this browser, not shared with other visitors.</p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block space-y-2 text-xs font-semibold uppercase tracking-wide text-slate/70">
      {label}{required ? " *" : ""}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="block w-full rounded-sm border border-border bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-slate focus:outline-none focus:ring-1 focus:ring-forest"
      />
    </label>
  )
}
