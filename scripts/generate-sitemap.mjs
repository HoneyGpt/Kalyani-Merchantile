import { mkdir, readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const configuredUrl = process.env.VITE_SITE_URL?.trim().replace(/\/$/, "")
const dist = resolve("dist")

if (!configuredUrl) {
  console.info("VITE_SITE_URL is not configured; skipping sitemap generation until the business selects a domain.")
  process.exit(0)
}

if (!/^https?:\/\//i.test(configuredUrl)) {
  throw new Error("VITE_SITE_URL must be an absolute http(s) URL.")
}

const routes = ["/", "/products", "/industries", "/about", "/contact"]
const entries = routes.map((path) => {
  const priority = path === "/" ? "1.0" : path === "/products" ? "0.9" : "0.7"
  return `  <url><loc>${configuredUrl}${path}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
})
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`

await mkdir(dist, { recursive: true })
await writeFile(resolve(dist, "sitemap.xml"), xml)
const robotsPath = resolve(dist, "robots.txt")
let robots = "User-agent: *\nAllow: /\nDisallow: /admin/\n"
try {
  robots = await readFile(robotsPath, "utf8")
} catch {}
if (!robots.includes("Sitemap:")) {
  robots += `\nSitemap: ${configuredUrl}/sitemap.xml\n`
}
await writeFile(robotsPath, robots)
console.info(`Generated sitemap for ${configuredUrl}`)
