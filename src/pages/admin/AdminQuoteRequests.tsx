import { useState } from "react"
import { MoreHorizontal, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getQuoteRequests,
  updateQuoteStatus,
  exportQuotesToCSV,
  simulateDelay,
} from "@/lib/data"
import type { QuoteRequest } from "@/types/catalog"

const STATUS_LABELS: Record<QuoteRequest["status"], string> = {
  new: "New",
  reviewing: "Reviewing",
  "supplier-enquiry": "Supplier enquiry",
  "quotation-prepared": "Quotation prepared",
  "sent-to-customer": "Sent to customer",
  closed: "Closed",
}

export function AdminQuoteRequests() {
  const [requests, setRequests] = useState<QuoteRequest[]>(getQuoteRequests())
  const [statusMsg, setStatusMsg] = useState<{ kind: "ok" | "bad"; text: string } | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  const refresh = () => setRequests(getQuoteRequests())

  const changeStatus = async (id: string, status: QuoteRequest["status"]) => {
    setSavingId(id)
    await simulateDelay(400)
    const updated = updateQuoteStatus(id, status)
    if (updated) {
      refresh()
      setStatusMsg({ kind: "ok", text: `Enquiry marked as ${STATUS_LABELS[status]}.` })
    } else {
      setStatusMsg({ kind: "bad", text: "Could not update enquiry." })
    }
    setSavingId(null)
  }

  const handleExport = () => {
    const csv = exportQuotesToCSV()
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `kalyani-quote-requests-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-forest-dark">Quote Requests</h2>
          <p className="text-slate">
            Submitted sourcing enquiries. Demonstration mode — records persist
            in browser storage only.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {statusMsg && (
        <div className={`rounded-sm p-3 text-sm ${
          statusMsg.kind === "ok" ? "bg-green-50/60 text-forest-dark border border-green-100/60" : "bg-red-50/60 text-red-800 border border-red-100/60"
        }`}>{statusMsg.text}</div>
      )}

      <div className="rounded-sm border border-border bg-white shadow-soft overflow-x-auto">
        <table className="w-full min-w-[920px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-ivory/50">
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Enquiry</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Contact</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60">Items</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Status</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Received</th>
              <th className="py-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-slate/60 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate/50">
                  No quote requests yet. Enquiries submitted through the public
                  quote form will appear here.
                </td>
              </tr>
            ) : (
              requests
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((request) => (
                  <tr key={request.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-medium text-forest-dark">#{request.id.slice(-6)}</div>
                      <div className="text-[11px] text-slate/50">{request.companyName}</div>
                    </td>
                    <td className="py-5 px-6 text-slate text-sm">
                      {request.contactName}<br />
                      <a href={`mailto:${request.email}`} className="text-forest hover:underline">
                        {request.email}
                      </a><br />
                      <a href={`tel:${request.phone}`} className="text-forest hover:underline">
                        {request.phone}
                      </a>
                    </td>
                    <td className="py-5 px-6 text-slate text-sm max-w-xs">
                      {request.requestedItems.map(
                        (item: QuoteRequest["requestedItems"][number], i) => (
                        <div key={i} className="text-sm">
                          {item.productName}{item.modelNumber ? ` (${item.modelNumber})` : ""} — qty {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <select
                        value={request.status}
                        onChange={(e) => changeStatus(request.id, e.target.value as QuoteRequest["status"])}
                        disabled={savingId === request.id}
                        className="border border-border rounded-sm px-2 py-1.5 text-[10px] font-medium bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-5 px-6 text-center text-[11px] text-slate/50">
                      {new Date(request.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <MoreHorizontal className="w-4 h-4 text-slate/40" />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border pt-6 text-xs text-slate/50">
        Statuses: New → Reviewing → Supplier enquiry → Quotation prepared →
        Sent to customer → Closed. Update a status as the enquiry progresses.
        In production, these records live in a protected database and enquirers
        never see one another&rsquo;s data.
      </div>
    </div>
  )
}
