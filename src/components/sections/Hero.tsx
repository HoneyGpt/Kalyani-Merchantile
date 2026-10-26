import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/data/siteConfig"

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-26">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="lg:col-span-1 mb-12 lg:mb-0 lg:pr-10">
            <p className="inline-block text-xs font-semibold tracking-wider text-gold-ink uppercase mb-6">
              {siteConfig.category}
            </p>
            <h1 className="mb-6 text-balance">{siteConfig.tagline}</h1>
            <p className="text-slate text-lg leading-relaxed mb-8 max-w-lg">
              From industrial equipment to essential business supplies, Kalyani
              Mercantile helps businesses source the products they need with a
              focus on clear communication, competitive quotations and
              dependable coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="forest" size="lg" asChild>
                <Link to="/products">
                  Explore Product Catalogue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
            <p className="mt-8 text-slate text-sm">
              Tell us what you need. We&rsquo;ll help you explore sourcing
              options.
            </p>
          </div>
          <div className="relative">
            <div className="relative rounded-sm border border-border bg-ivory shadow-card overflow-hidden">
              <img
                src="/images/hero.jpg"
                alt="Industrial equipment in a clean warehouse environment"
                className="h-[420px] w-full object-cover object-[70%_center] lg:h-[520px]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
