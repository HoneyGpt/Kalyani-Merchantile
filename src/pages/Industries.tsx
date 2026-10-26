import { SEO } from "@/components/SEO"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const industries = [
  {
    id: "construction",
    image: "/images/categories/aerial-work-platforms.jpg",
    title: "Construction & Infrastructure",
    description:
      "Equipment and supplies for building, civil works and infrastructure projects — access platforms, material handling and site essentials.",
    relatedCategory: "material-handling-equipment",
  },
  {
    id: "manufacturing",
    image: "/images/categories/industrial-equipment.jpg",
    title: "Manufacturing & Industrial Operations",
    description:
      "Plant equipment, tooling and consumables to keep manufacturing lines and operations running.",
    relatedCategory: "industrial-equipment",
  },
  {
    id: "warehousing",
    image: "/images/categories/material-handling-equipment.jpg",
    title: "Warehousing & Logistics",
    description:
      "Material handling, storage and movement equipment for warehouses, distribution centres and storage facilities.",
    relatedCategory: "material-handling-equipment",
  },
  {
    id: "facilities",
    image: "/images/categories/general-business-procurement.jpg",
    title: "Facilities & Commercial Properties",
    description:
      "Supplies and equipment for facility management, maintenance and commercial property upkeep.",
    relatedCategory: "general-business-procurement",
  },
  {
    id: "institutional",
    image: "/images/categories/electrical-technical-supplies.jpg",
    title: "Institutional Procurement",
    description:
      "Sourcing support for institutional and organisational purchasing teams with multi-item requirements.",
    relatedCategory: "general-business-procurement",
  },
]

export function Industries() {
  return (
    <>
      <SEO
        title="Industries We Serve — Procurement Support"
        description="Kalyani Mercantile supports procurement requirements across construction, manufacturing, warehousing, facilities and institutional sectors."
        path="/industries"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Industries We Serve
          </h1>
          <p className="text-slate leading-relaxed max-w-2xl">
            Kalyani Mercantile supports procurement requirements across these
            business sectors. These are intended customer sectors — project
            experience and client claims are not made unless verified.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} {...industry} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

function IndustryCard({
  title,
  description,
  image,
  relatedCategory,
}: {
  title: string
  description: string
  image: string
  relatedCategory: string
}) {
  return (
    <div className="flex flex-col border border-border rounded-sm bg-white shadow-soft overflow-hidden transition-all hover:shadow-card">
      <div className="aspect-[16/9] overflow-hidden bg-ivory">
        <img src={image} alt={`${title} sourcing category`} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-8">
      <h2 className="text-xl font-semibold text-forest-dark mb-3">{title}</h2>
      <p className="text-slate leading-relaxed mb-6 flex-1">{description}</p>
      <div className="mt-auto pt-6 border-t border-border flex gap-4">
        <Link
          to={`/products?category=${relatedCategory}`}
          className="text-xs font-semibold text-gold-ink hover:text-forest-dark transition-colors flex items-center gap-1"
        >
          Browse {title} &rarr;
        </Link>
        <Link
          to="/contact"
          className="text-xs font-semibold text-gold-ink hover:text-forest-dark transition-colors flex items-center gap-1"
        >
          Request a Quote <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      </div>
    </div>
  )
}
