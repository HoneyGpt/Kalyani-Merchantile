import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const industries = [
  {
    title: "Roads & Infrastructure",
    description:
      "Road tar, construction materials and project supplies for infrastructure requirements.",
    image: "/images/categories/aerial-work-platforms.jpg",
    to: "/industries",
  },
  {
    title: "Manufacturing & Industrial Operations",
    description:
      "Plant equipment, tooling and consumables for manufacturing businesses.",
    image: "/images/categories/industrial-equipment.jpg",
    to: "/industries",
  },
  {
    title: "Food & Dairy Processing",
    description:
      "Chemicals and process supplies used in food and dairy production.",
    image: "/images/categories/chemicals-industrial-consumables.jpg",
    to: "/industries",
  },
  {
    title: "Office & Institutional Procurement",
    description:
      "Stationery, office supplies and multi-item sourcing for organisations.",
    image: "/images/categories/general-business-procurement.jpg",
    to: "/industries",
  },
  {
    title: "Warehousing & Logistics",
    description:
      "Material handling, storage and movement equipment for warehouses and distribution.",
    image: "/images/categories/material-handling-equipment.jpg",
    to: "/industries",
  },
  {
    title: "Facilities & Commercial Properties",
    description:
      "Supplies and equipment for facility management and commercial upkeep.",
    image: "/images/categories/general-business-procurement.jpg",
    to: "/industries",
  },
  {
    title: "Institutional Procurement",
    description:
      "Sourcing support for institutional and organisational purchasing teams.",
    image: "/images/categories/electrical-technical-supplies.jpg",
    to: "/industries",
  },
]

export function IndustriesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-3">Supporting Diverse Business Requirements</h2>
          <p className="text-slate">
            From project materials and process supplies to everyday office needs—we support sourcing across these and many other sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryLink key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustryLink({ title, description, image, to }: { title: string; description: string; image: string; to: string }) {
  return (
    <Link
      to={to}
      className="block group flex flex-col border border-border rounded-sm bg-white p-8 shadow-soft transition-all duration-200 hover:shadow-card"
    >
      <div className="-mx-8 -mt-8 mb-6 aspect-[16/9] overflow-hidden bg-ivory">
        <img src={image} alt={`${title} procurement requirements`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <span className="text-[10px] font-semibold tracking-wider text-gold-ink uppercase mb-4">
        Sourcing area
      </span>
      <h3 className="text-lg font-semibold text-forest-dark mb-3">{title}</h3>
      <p className="text-slate text-sm leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <span className="text-xs font-medium text-gold-ink flex items-center gap-1">
        Learn more <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  )
}
