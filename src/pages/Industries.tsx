import { SEO } from "@/components/SEO"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const industries = [
  {
    id: "roads",
    image: "/images/categories/industrial-equipment.jpg",
    title: "Roads & Infrastructure",
    description: "Road tar, construction materials and project supplies for road and infrastructure requirements.",
    relatedCategory: "roads-infrastructure",
  },
  {
    id: "food-dairy",
    image: "/images/categories/chemicals-industrial-consumables.jpg",
    title: "Food & Dairy Processing",
    description: "Chemicals and process supplies used in dairy products and food production.",
    relatedCategory: "food-dairy-chemicals",
  },
  {
    id: "manufacturing",
    image: "/images/categories/electrical-technical-supplies.jpg",
    title: "Manufacturing & Industrial Operations",
    description: "Industrial automation, electricals, tools, motors and maintenance supplies.",
    relatedCategory: "industrial-automation",
  },
  {
    id: "offices",
    image: "/images/categories/general-business-procurement.jpg",
    title: "Offices & Institutions",
    description: "Stationery, office consumables and multi-item procurement for organisations.",
    relatedCategory: "stationery-office-supplies",
  },
  {
    id: "facilities",
    image: "/images/categories/general-business-procurement.jpg",
    title: "Facilities & Hospitality",
    description: "Cleaning, hospitality, plumbing and day-to-day facility requirements.",
    relatedCategory: "cleaning",
  },
  {
    id: "automotive",
    image: "/images/categories/material-handling-equipment.jpg",
    title: "Automotive & Maintenance",
    description: "Automotive MRO, tools, accessories and maintenance supplies.",
    relatedCategory: "automotive-mro-accessories",
  },
]

export function Industries() {
  return (
    <>
      <SEO
        title="Industries & Business Sourcing"
        description="Sourcing support for infrastructure, food and dairy, manufacturing, offices, facilities and automotive requirements."
        path="/industries"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="mb-4 text-3xl font-semibold leading-tight md:text-4xl">Industries & Business Sourcing</h1>
            <p className="max-w-3xl leading-relaxed text-slate">
              We support a broad range of business and project requirements—from food and dairy processing to road works, offices and industrial operations. Our sourcing scope isn’t limited to the examples below; share any requirement with us.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => <IndustryCard key={industry.id} {...industry} />)}
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
    <article className="flex flex-col overflow-hidden rounded-sm border border-border bg-white shadow-soft transition-all hover:shadow-card">
      <div className="aspect-[16/9] overflow-hidden bg-ivory">
        <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h2 className="mb-3 text-xl font-semibold text-forest-dark">{title}</h2>
        <p className="mb-6 flex-1 leading-relaxed text-slate">{description}</p>
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
          <Link to={`/categories/${relatedCategory}`} className="inline-flex items-center gap-1 text-xs font-semibold text-gold-ink hover:text-forest-dark">
            Browse related products <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="text-xs font-semibold text-gold-ink hover:text-forest-dark">Request a quote</Link>
        </div>
      </div>
    </article>
  )
}
