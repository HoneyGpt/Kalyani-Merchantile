import { SEO } from "@/components/SEO"
import { Hero } from "@/components/sections/Hero"
import { CategoryGrid } from "@/components/sections/CategoryGrid"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Features } from "@/components/sections/Features"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { IndustriesSection } from "@/components/sections/IndustriesSection"
import { CTA } from "@/components/sections/CTA"
import { siteConfig } from "@/data/siteConfig"

export function Home() {
  return (
    <>
      <SEO
        title="Procurement & Supply Solutions in India"
        description={siteConfig.defaultSeo.description}
        path="/"
      />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <Features />
      <HowItWorks />
      <IndustriesSection />
      <CTA />
    </>
  )
}
