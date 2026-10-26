import { useState } from "react"
import { siteConfig } from "@/data/siteConfig"

export function AnnouncementStrip() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem("km-announcement-dismissed") === "1"
    } catch {
      return false
    }
  })

  if (!siteConfig.announcement || dismissed) return null

  return (
    <div className="bg-ivory border-b border-border text-slate text-xs font-medium px-6 py-3 flex items-center justify-between gap-4">
      <span>{siteConfig.announcement}</span>
      <button
        onClick={() => {
          setDismissed(true)
          try {
            localStorage.setItem("km-announcement-dismissed", "1")
          } catch {}
        }}
        className="text-slate hover:text-forest transition-colors"
        aria-label="Dismiss announcement"
      >
        Dismiss
      </button>
    </div>
  )
}
