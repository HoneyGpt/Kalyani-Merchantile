import { useEffect } from "react"
import { siteConfig } from "@/data/siteConfig"

type SEOProps = {
  title: string
  description: string
  path?: string
  image?: string
}

export function SEO({ title, description, path = "/", image }: SEOProps) {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "")
  const canonical = baseUrl ? `${baseUrl}${path}` : ""

  useEffect(() => {
    document.title = `${title} | ${siteConfig.name}`

    const setMeta = (name: string, value: string) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("name", name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    const setProperty = (property: string, value: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("property", property)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    setMeta("description", description)
    setProperty("og:title", title)
    setProperty("og:description", description)
    setProperty("og:type", "website")
    setProperty("og:site_name", siteConfig.name)
    if (canonical) {
      setProperty("og:url", canonical)
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement("link")
        link.rel = "canonical"
        document.head.appendChild(link)
      }
      link.href = canonical
    }
    if (image && baseUrl) setProperty("og:image", `${baseUrl}${image}`)
    setMeta("twitter:card", image ? "summary_large_image" : "summary")
  }, [title, description, path, image, canonical, baseUrl])

  return null
}
