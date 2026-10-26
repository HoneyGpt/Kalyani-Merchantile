interface Feature {
  title: string
  body: string
}

const features: Feature[] = [
  {
    title: "Requirement-led sourcing",
    body:
      "We start by understanding the product, specification, quantity and delivery requirements.",
  },
  {
    title: "Quotation transparency",
    body:
      "Request clear pricing and relevant commercial details before making a decision.",
  },
  {
    title: "Supplier coordination",
    body:
      "We coordinate sourcing enquiries and help clarify availability, delivery and warranty information with suppliers.",
  },
  {
    title: "Responsive communication",
    body:
      "Keep communication organised throughout the quotation and procurement process.",
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-3">A Clearer Way to Procure</h2>
          <p className="text-slate">Every enquiry is handled as a sourcing project.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureBlock key={idx} number={idx + 1} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureBlock({ number, title, body }: { number: number; title: string; body: string }) {
  return (
    <div className="flex flex-col rounded-sm border border-border bg-white p-8 shadow-soft transition-all duration-200 group hover:shadow-card">
      <div className="w-10 h-10 rounded-sm bg-ivory flex items-center justify-center mb-6">
        <span className="text-forest font-semibold text-sm">{number}</span>
      </div>
      <h3 className="text-lg font-semibold text-forest-dark mb-3">{title}</h3>
      <p className="text-slate text-sm leading-relaxed">{body}</p>
    </div>
  )
}
