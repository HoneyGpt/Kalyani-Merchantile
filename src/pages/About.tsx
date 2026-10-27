import { SEO } from "@/components/SEO"

export function About() {
  return (
    <>
      <SEO
        title="About Us — Built Around Your Procurement Requirements"
        description="Kalyani Mercantile helps businesses source products across industrial, commercial, food and dairy, infrastructure, office and institutional requirements."
        path="/about"
      />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Built Around Your Procurement Requirements.
          </h1>
          <p className="text-slate text-lg leading-relaxed">
            Kalyani Mercantile helps businesses source products across
            industrial, commercial, food and dairy, infrastructure, office and
            institutional requirements. Share the item, quantity and destination;
            we coordinate sourcing options and a clear quotation.
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
                We prepare clear quotations for the exact products and
                quantities requested, with commercial terms shared before you
                decide. Communication stays organised from enquiry through
                order confirmation.
              </p>
            </>
          } />

          <Section title="A broad sourcing range" body={
            <>
              <ul className="list-disc list-inside space-y-3 text-slate leading-relaxed mt-4">
                <li>Industrial equipment, tools, electricals and automation</li>
                <li>Food and dairy processing chemicals and supplies</li>
                <li>Road construction materials, including road tar requirements</li>
                <li>Stationery, office and institutional supplies</li>
                <li>Cleaning, safety, hospitality, plumbing and project needs</li>
              </ul>
              <p className="text-sm text-slate mt-4">
                Don’t see your item here? Our sourcing scope isn’t limited to these categories—send us any business or project requirement.
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
