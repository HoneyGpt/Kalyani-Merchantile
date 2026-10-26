import { Link } from "react-router-dom"

export function CTA() {
  return (
    <section className="py-24 bg-forest text-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-3 bg-gold rounded-sm" />
          <h2 className="text-3xl font-semibold tracking-tight">Looking for a Specific Product?</h2>
        </div>
        <p className="text-ivory/90 text-lg leading-relaxed mb-10 max-w-2xl">
          Share your product requirement with us. Include the model, quantity,
          delivery location and any specifications, and we&rsquo;ll help you
          take the next step.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-forest-dark px-8 py-3.5 text-sm font-medium rounded-sm hover:bg-gold soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Submit a Requirement
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-ivory/40 text-ivory px-8 py-3.5 text-sm font-medium rounded-sm hover:bg-ivory/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
