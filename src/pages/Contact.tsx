import { useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Phone, Mail, MapPin, Link as LinkIcon, Send, Loader2, Clock } from "lucide-react"
import { useForm, useFieldArray, useFormContext, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SEO } from "@/components/SEO"
import { Button } from "@/components/ui/button"
import { addQuoteRequest } from "@/lib/data"
import { configuredEmailHref, configuredPhoneHref, configuredWhatsAppHref } from "@/lib/contactLinks"
import { siteConfig } from "@/data/siteConfig"

const quoteSchema = z.object({
  contactName: z.string().min(2, "Please enter your full name"),
  companyName: z.string().min(1, "Please enter your organisation"),
  email: z.string().email("Please enter a valid business email"),
  phone: z
    .string()
    .min(1, "Please enter a phone number")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number"),
  deliveryCity: z.string().min(1, "Please enter a delivery city"),
  deliveryState: z.string().min(1, "Please enter a delivery state"),
  preferredContact: z.enum(["email", "phone", "whatsapp", "in-person"]),
  items: z
    .array(
      z.object({
        productName: z.string().min(1, "Please name the product or requirement"),
        modelNumber: z.string().optional(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        notes: z.string().optional(),
      })
    )
    .min(1, "Please add at least one product"),
  purchaseTimeline: z.string().optional(),
  additionalNotes: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must consent to our privacy notice",
  })
})

type QuoteFormValues = z.TypeOf<typeof quoteSchema>

// DEMO_STORAGE_KEY removed — quote requests now flow through src/lib/data.ts

export function Contact() {
  const seo = (
    <SEO
      title="Request a Quote — Sourcing Enquiry"
      description="Share your product requirement with Kalyani Mercantile. We help businesses source equipment and supplies with clear quotations."
      path="/contact"
    />
  )
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultProduct = searchParams.get("product") || ""
  const defaultModel = searchParams.get("model") || ""

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      contactName: "",
      companyName: "",
      email: "",
      phone: "",
      deliveryCity: "",
      deliveryState: "",
      preferredContact: "email",
      items: [
        {
          productName: defaultProduct,
          modelNumber: defaultModel,
          quantity: 1,
          notes: "",
        },
      ],
      purchaseTimeline: "",
      additionalNotes: "",
      consent: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const onSubmit = async (values: QuoteFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus("sending")
    setSubmitError(null)

    try {
    // Demo mode: no backend is connected. Persist the enquiry locally and mark
    // it explicitly as a demo record. A real integration would send this to a
    // protected endpoint via an edge function; never expose service-role keys
    // in frontend code. Do not claim the enquiry was emailed unless the
    // backend action succeeded.
    await new Promise((resolve) => setTimeout(resolve, 1200))

    addQuoteRequest({
      contactName: values.contactName,
      companyName: values.companyName,
      email: values.email,
      phone: values.phone,
      deliveryLocation: `${values.deliveryCity}, ${values.deliveryState}`,
      preferredContact: values.preferredContact,
      requestedItems: values.items.map((i) => ({
        productId: null,
        productName: i.productName,
        modelNumber: i.modelNumber || null,
        quantity: i.quantity,
        notes: i.notes || null,
      })),
      purchaseTimeline: values.purchaseTimeline || null,
      additionalNotes: values.additionalNotes || null,
      documentUrl: null,
    })

    setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
      setSubmitError("Your enquiry could not be saved in this browser. Check browser storage and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <>
        {seo}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-sm border border-border bg-white p-12 md:p-16 text-center shadow-soft">
            <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
              <Send className="w-6 h-6 text-forest" />
            </div>
            <h2 className="text-2xl font-semibold text-forest-dark mb-4">
              Thank you for your enquiry
            </h2>
            <p className="text-slate leading-relaxed mb-8 max-w-lg mx-auto">
              Your demo enquiry has been saved in this browser. It has not been
              sent to Kalyani Mercantile because a production enquiry service
              is not connected yet.
            </p>
            <p className="text-xs text-slate/50 mb-10">
              This demo does not notify the business or trigger a response. A
              secure production enquiry service must be connected before launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="forest" asChild onClick={() => navigate("/")}>
                <Link to="/">Return to Home</Link>
              </Button>
              <Button variant="outline" asChild onClick={() => navigate("/products")}>
                <Link to="/products">Browse Catalogue</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }

  return (
    <>
      {seo}
      <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Contact information */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-ink">{siteConfig.name}</p>
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <p className="text-slate leading-relaxed mb-8">
              {siteConfig.description}
            </p>
            {configuredPhoneHref && (
              <ContactDetail
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                value={siteConfig.phone}
                href={configuredPhoneHref}
              />
            )}
            {configuredEmailHref && (
              <ContactDetail
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={siteConfig.email}
                href={configuredEmailHref}
              />
            )}
            {configuredWhatsAppHref && (
              <ContactDetail
                icon={<LinkIcon className="w-5 h-5" />}
                label="WhatsApp"
                value="Chat with us"
                href={configuredWhatsAppHref}
                external
              />
            )}
            {siteConfig.address && (
              <ContactDetail
                icon={<MapPin className="w-5 h-5" />}
                label="Address"
                value={siteConfig.address}
              />
            )}
            {siteConfig.businessHours && (
              <ContactDetail
                icon={<Clock className="w-5 h-5" />}
                label="Business hours"
                value={siteConfig.businessHours}
              />
            )}
          </div>

          {/* Quote form */}
          <div className="lg:col-span-8">
              <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <h2 className="text-2xl font-semibold mb-2">Request a Quote</h2>
              <p className="text-slate mb-6">
                Share your requirement below. You can add multiple products to
                a single enquiry.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  {...form.register("contactName")}
                  label="Contact person's name"
                  placeholder="e.g. Ravi Kumar"
                  required
                  error={form.formState.errors.contactName?.message}
                />
                <TextField
                  {...form.register("companyName")}
                  label="Company / organisation"
                  placeholder="e.g. Acme Constructions"
                  required
                  error={form.formState.errors.companyName?.message}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  {...form.register("email")}
                  type="email"
                  label="Business email"
                  placeholder="e.g. ravi@acme.in"
                  required
                  error={form.formState.errors.email?.message}
                />
                <TextField
                  {...form.register("phone")}
                  type="tel"
                  label="Phone number"
                  placeholder="e.g. +91 98765 43210"
                  required
                  error={form.formState.errors.phone?.message}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  {...form.register("deliveryCity")}
                  label="Delivery city"
                  placeholder="e.g. Kakinada"
                  required
                  error={form.formState.errors.deliveryCity?.message}
                />
                <TextField
                  {...form.register("deliveryState")}
                  label="Delivery state"
                  placeholder="e.g. Andhra Pradesh"
                  required
                  error={form.formState.errors.deliveryState?.message}
                />
              </div>

              <SelectField
                {...form.register("preferredContact")}
                label="Preferred contact method"
                required
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "in-person", label: "In-person meeting" },
                ]}
                error={form.formState.errors.preferredContact?.message}
              />

              <fieldset className="border border-border rounded-sm p-6">
                <legend className="text-xs font-semibold uppercase tracking-tighter text-slate/60 px-2">
                  Items for quotation
                </legend>
                <div className="space-y-4" id="quote-items">
                  {fields.map((field, index) => (
                    <ItemRow
                      key={field.id}
                      index={index}
                      remove={remove}
                      defaultProduct={index === 0 ? defaultProduct : undefined}
                      defaultModel={index === 0 ? defaultModel : undefined}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      append({
                        productName: "",
                        modelNumber: "",
                        quantity: 1,
                        notes: "",
                      })
                    }}
                  >
                    Add another product
                  </Button>
                </div>
                {form.formState.errors.items?.message && (
                  <p className="mt-3 text-xs text-destructive">{form.formState.errors.items.message}</p>
                )}
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  {...form.register("purchaseTimeline")}
                  label="Expected purchase timeline (optional)"
                  placeholder="e.g. Within 2 months"
                  error={form.formState.errors.purchaseTimeline?.message}
                />
                <TextField
                  {...form.register("additionalNotes")}
                  as="textarea"
                  rows={3}
                  label="Additional notes (optional)"
                  placeholder="Any delivery, specification or compliance requirements"
                  error={form.formState.errors.additionalNotes?.message}
                />
              </div>

              <DocumentUploadField />

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="consent"
                  {...form.register("consent")}
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-forest focus:ring-forest mt-0.5"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-slate leading-relaxed"
                >
                  I agree that these details may be used to review this
                  sourcing enquiry. This demo form stores data only in this
                  browser; a production privacy policy and secure enquiry
                  service must be configured before launch.
                </label>
              </div>
              {form.formState.errors.consent && (
                <p className="mt-1.5 text-xs text-destructive">
                  {form.formState.errors.consent.message}
                </p>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="forest"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </Button>
              </div>

              {submitStatus === "error" && (
                <div className="mt-4 rounded-sm border border-destructive/20 bg-destructive/10 p-4 text-destructive text-sm">
                  {submitError}
                </div>
              )}
</form>
            </FormProvider>
          </div>
        </div>
      </div>
      </section>
    </>
    )
  }

function ItemRow({
  index,
  remove,
  defaultProduct,
  defaultModel,
}: {
  index: number
  remove: (index: number) => void
  defaultProduct?: string
  defaultModel?: string
}) {
  const form = useFormContext()
  const canRemove = form.getValues("items").length > 1
  const itemErrors = (form.formState.errors as any).items

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      <TextField
        {...form.register(`items.${index}.productName`)}
        label="Product or requirement"
        placeholder="e.g. Electric scissor lift"
        defaultValue={defaultProduct}
        required
        error={itemErrors?.[index]?.productName?.message}
      />
      <TextField
        {...form.register(`items.${index}.modelNumber`)}
        label="Model number (optional)"
        placeholder="e.g. MSX10E"
        defaultValue={defaultModel}
        error={itemErrors?.[index]?.modelNumber?.message}
      />
      <TextField
        {...form.register(`items.${index}.quantity`)}
        type="number"
        label="Quantity"
        placeholder="1"
        required
        error={itemErrors?.[index]?.quantity?.message}
      />
      {canRemove && (
        <button
          type="button"
          onClick={() => remove(index)}
          className="flex h-[44px] items-center justify-center w-full text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
          aria-label="Remove item"
        >
          <span className="text-[18px]">&times;</span>
        </button>
      )}
    </div>
  )
}

function TextField({
  label,
  required,
  error,
  as,
  rows,
  type,
  placeholder,
  defaultValue,
  ...rest
}: {
  label: string
  required?: boolean
  error?: string
  as?: "textarea"
  rows?: number
  type?: string
  placeholder?: string
  defaultValue?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const Comp = as === "textarea" ? "textarea" : "input"
  const fieldId = rest.id || `quote-${String(rest.name || label).replace(/[^a-z0-9_-]/gi, "-")}`
  const errorId = `${fieldId}-error`
  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-tighter text-slate/60 block">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <Comp
        {...rest}
        id={fieldId}
        placeholder={placeholder}
        type={type || (as === "textarea" ? undefined : "text")}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className={cnInput(
          "w-full pl-3 pr-9 py-3 border border-border rounded-sm bg-white text-slate focus:outline-none focus:ring-1 focus:ring-forest transition-all",
          !!error
        )}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}

function cnInput(base: string, error?: boolean) {
  return `${base} ${error ? "border-destructive focus:ring-destructive" : ""}`
}

function SelectField({
  label,
  required,
  error,
  options,
  ...rest
}: {
  label: string
  required?: boolean
  error?: string
  options: Array<{ value: string; label: string }>
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "defaultValue">) {
  const fieldId = rest.id || `quote-${String(rest.name || label).replace(/[^a-z0-9_-]/gi, "-")}`
  const errorId = `${fieldId}-error`
  return (
    <div className="space-y-2 relative">
      <label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-tighter text-slate/60 block">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <select
        {...rest}
        id={fieldId}
        required={required}
        className="w-full pl-3 pr-10 py-3 border border-border rounded-sm bg-white text-slate focus:outline-none focus:ring-1 focus:ring-forest transition-all appearance-none"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <span className="w-4 h-4 text-slate/40">&or;</span>
      </div>
      {error && <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

function DocumentUploadField() {
  return (
    <div className="space-y-2">
      <label htmlFor="quote-document" className="text-xs font-semibold uppercase tracking-tighter text-slate/60 block">
        Upload RFQ or specification document (optional)
      </label>
      <input
        id="quote-document"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        disabled
        className="w-full text-sm text-slate border border-border rounded-sm p-3 bg-ivory focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />
      <p className="text-xs text-slate/50">
        Secure file upload requires backend configuration. Attachments are
        handled only when a secure upload endpoint is connected.
      </p>
    </div>
  )
}

function ContactDetail({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-shrink-0 w-5 h-5 text-gold-ink">{icon}</div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-tighter text-slate/60 block mb-0.5">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener" : undefined}
            className="text-sm text-slate hover:text-forest transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-slate">{value}</span>
        )}
      </div>
    </div>
  )
}
