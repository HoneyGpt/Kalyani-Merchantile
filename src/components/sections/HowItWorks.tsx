const steps = [
  {
    number: "01",
    title: "Share your requirement",
    body:
      "Tell us the product, model, quantity, destination and any technical specifications.",
  },
  {
    number: "02",
    title: "Review sourcing options",
    body:
      "We assess the requirement and contact relevant suppliers where appropriate.",
  },
  {
    number: "03",
    title: "Receive a quotation",
    body:
      "We share the available commercial information and clarify relevant terms.",
  },
  {
    number: "04",
    title: "Confirm the order",
    body:
      "Procurement proceeds only after the customer approves the final quotation and agreed terms.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-3">From Requirement to Quotation</h2>
          <p className="text-slate">
            Availability, delivery timelines, payment terms and warranty depend
            on the actual supplier quotation and order.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Step({
  number,
  title,
  body,
}: {
  number: string
  title: string
  body: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative z-10 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-forest text-white font-semibold text-sm">
          {number}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-forest-dark mb-3">{title}</h3>
      <p className="text-slate text-sm leading-relaxed max-w-xs mx-auto">
        {body}
      </p>
    </div>
  )
}
