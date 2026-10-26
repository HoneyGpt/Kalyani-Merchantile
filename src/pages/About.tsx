import { SEO } from "@/components/SEO"

export function About() {
  return (
    <>
      <SEO
        title="About Us — Built Around Your Procurement Requirements"
        description="Kalyani Mercantile is a procurement and supply partner helping businesses source equipment and products with clear communication and dependable coordination."
        path="/about"
      />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Built Around Your Procurement Requirements.
          </h1>
          <p className="text-slate text-lg leading-relaxed">
            Kalyani Mercantile is being developed as a procurement and supply
            partner for businesses seeking equipment, products and sourcing
            support. Our approach centres on understanding each requirement,
            communicating clearly, and coordinating with relevant suppliers to
            help customers make informed purchasing decisions.
          </p>
        </div>

        <div className="space-y-16">
          <Section id="approach" title="Our approach" body={
            <>
              <p>
                We begin every engagement by understanding the product,
                specification, quantity and delivery requirement. Rather than
                pushing a catalogue, we respond to what your business actually
                needs — whether that is a specific machine model, a category of
                supplies, or a multi-item sourcing requirement.
              </p>
              <p>
                Enquiries are assessed individually, and where appropriate we
                contact relevant suppliers to clarify availability, commercial
                terms, delivery and warranty information before anything is
                presented back to you.
              </p>
            </>
          } />

          <Section title="Our sourcing process" body={
            <>
              <ol className="list-decimal list-inside space-y-3 text-slate leading-relaxed mt-4">
                <li>
                  You share your requirement — product, model, quantity,
                  delivery location and specifications.
                </li>
                <li>
                  We review the requirement and identify relevant suppliers or
                  sourcing channels.
                </li>
                <li>
                  We share available commercial information and clarify terms
                  with you before any commitment.
                </li>
                <li>
                  Procurement proceeds only after you approve the final
                  quotation and agreed terms.
                </li>
              </ol>
              <p className="text-xs text-slate/50 mt-4">
                Availability, delivery timelines, payment terms and warranty
                depend on the actual supplier quotation and order.
              </p>
            </>
          } />

          <Section title="Our commitment to transparent communication" body={
            <>
              <p>
                Pricing is never invented or displayed without a verified
                quotation. We aim to keep communication organised using your
                preferred contact method, from quotation through to order
                confirmation.
              </p>
            </>
          } />

          <Section title="The types of requirements we aim to support" body={
            <>
              <ul className="list-disc list-inside space-y-3 text-slate leading-relaxed mt-4">
                <li>Industrial equipment and access platforms</li>
                <li>Material handling and warehouse equipment</li>
                <li>Electrical and technical supplies</li>
                <li>Chemicals and industrial consumables</li>
                <li>General business procurement requirements</li>
              </ul>
              <p className="text-xs text-slate/50 mt-4">
                These are intended categories of support. Product availability
                depends on suppliers and is confirmed per enquiry.
              </p>
            </>
          } />
        </div>
      </div>
    </section>
    </>
  )
}

function Section({ id, title, body }: { id?: string; title: string; body: React.ReactNode }) {
  return (
    <div id={id}>
      <h2 className="text-xl font-semibold text-forest-dark mb-4">{title}</h2>
      {body}
    </div>
  )
}
