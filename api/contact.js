import nodemailer from "nodemailer"

const DEFAULT_MAILBOX = "sales.team@kalyanimerchantile.tech"
const MAX_ITEMS = 20

const asText = (value, maxLength = 1000) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : ""

const safeHeader = (value) => asText(value, 160).replace(/[\r\n]+/g, " ")

const escapeHtml = (value) =>
  asText(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character])

function validate(body) {
  const contactName = asText(body?.contactName, 120)
  const companyName = asText(body?.companyName, 160)
  const email = asText(body?.email, 254).toLowerCase()
  const phone = asText(body?.phone, 40)
  const deliveryCity = asText(body?.deliveryCity, 120)
  const deliveryState = asText(body?.deliveryState, 120)
  const preferredContact = asText(body?.preferredContact, 20)
  const purchaseTimeline = asText(body?.purchaseTimeline, 200)
  const additionalNotes = asText(body?.additionalNotes, 3000)
  const items = Array.isArray(body?.items) ? body.items : []

  if (items.length > MAX_ITEMS) return { error: `Please limit an enquiry to ${MAX_ITEMS} items.` }
  if (contactName.length < 2) return { error: "Please enter your name." }
  if (!companyName) return { error: "Please enter your company or organisation." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." }
  }
  const phoneDigits = phone.replace(/\D/g, "")
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { error: "Please enter a valid phone number." }
  }
  if (!deliveryCity || !deliveryState) {
    return { error: "Please enter the delivery city and state." }
  }
  if (!["email", "phone", "whatsapp", "in-person"].includes(preferredContact)) {
    return { error: "Please select a preferred contact method." }
  }
  if (!body?.consent) return { error: "Please confirm consent to use these details for your enquiry." }
  if (items.length === 0) return { error: "Please add at least one product or requirement." }

  const normalizedItems = []
  for (const item of items) {
    const productName = asText(item?.productName, 160)
    const modelNumber = asText(item?.modelNumber, 100)
    const notes = asText(item?.notes, 1000)
    const quantity = Number(item?.quantity)
    if (!productName || !Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
      return { error: "Please check the product name and quantity." }
    }
    normalizedItems.push({ productName, modelNumber, quantity, notes })
  }

  return {
    data: {
      contactName,
      companyName,
      email,
      phone,
      deliveryCity,
      deliveryState,
      preferredContact,
      purchaseTimeline,
      additionalNotes,
      items: normalizedItems,
    },
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Use POST to submit an enquiry." })
  }

  const body = req.body && typeof req.body === "object" ? req.body : {}
  // Quietly accept automated honeypot submissions without emailing the team.
  if (asText(body.website, 200)) return res.status(200).json({ success: true })

  const validation = validate(body)
  if (validation.error) return res.status(400).json({ error: validation.error })

  const smtpHost = process.env.ZOHO_SMTP_HOST || "smtppro.zoho.in"
  const smtpPort = Number(process.env.ZOHO_SMTP_PORT || 465)
  const smtpUser = process.env.ZOHO_SMTP_USER
  const smtpPassword = process.env.ZOHO_SMTP_PASSWORD
  const recipient = process.env.CONTACT_TO || DEFAULT_MAILBOX
  const sender = process.env.CONTACT_FROM || smtpUser || DEFAULT_MAILBOX

  if (!smtpUser || !smtpPassword || ![465, 587].includes(smtpPort)) {
    return res.status(503).json({
      error: "Email delivery is not configured yet. Please email sales.team@kalyanimerchantile.tech directly.",
    })
  }

  const { data } = validation
  const itemLines = data.items.map((item, index) => {
    const model = item.modelNumber ? ` (Model: ${item.modelNumber})` : ""
    const note = item.notes ? `\n   Notes: ${item.notes}` : ""
    return `${index + 1}. ${item.productName}${model} — Quantity: ${item.quantity}${note}`
  })
  const subject = `Sourcing enquiry from ${safeHeader(data.contactName)} — ${safeHeader(data.companyName)}`
  const text = [
    "New sourcing enquiry from the Kalyani Mercantile website",
    "",
    `Contact: ${data.contactName}`,
    `Company: ${data.companyName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Preferred contact: ${data.preferredContact}`,
    `Delivery location: ${data.deliveryCity}, ${data.deliveryState}`,
    `Purchase timeline: ${data.purchaseTimeline || "Not specified"}`,
    "",
    "Items:",
    ...itemLines,
    "",
    `Additional notes: ${data.additionalNotes || "None"}`,
  ].join("\n")
  const htmlItems = data.items.map((item) => {
    const model = item.modelNumber ? ` <span>(Model: ${escapeHtml(item.modelNumber)})</span>` : ""
    const notes = item.notes ? `<br><small>Notes: ${escapeHtml(item.notes)}</small>` : ""
    return `<li><strong>${escapeHtml(item.productName)}</strong>${model} — Quantity: ${item.quantity}${notes}</li>`
  }).join("")
  const html = `
    <h2>New sourcing enquiry</h2>
    <p><strong>Contact:</strong> ${escapeHtml(data.contactName)}<br>
    <strong>Company:</strong> ${escapeHtml(data.companyName)}<br>
    <strong>Email:</strong> ${escapeHtml(data.email)}<br>
    <strong>Phone:</strong> ${escapeHtml(data.phone)}<br>
    <strong>Preferred contact:</strong> ${escapeHtml(data.preferredContact)}<br>
    <strong>Delivery location:</strong> ${escapeHtml(data.deliveryCity)}, ${escapeHtml(data.deliveryState)}<br>
    <strong>Purchase timeline:</strong> ${escapeHtml(data.purchaseTimeline || "Not specified")}</p>
    <h3>Items</h3><ol>${htmlItems}</ol>
    <p><strong>Additional notes:</strong><br>${escapeHtml(data.additionalNotes || "None").replace(/\n/g, "<br>")}</p>
  `

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
      connectionTimeout: 12000,
      greetingTimeout: 12000,
      socketTimeout: 15000,
    })

    await transporter.sendMail({
      from: { name: "Kalyani Mercantile", address: sender },
      to: recipient,
      replyTo: data.email,
      subject,
      text,
      html,
    })

    return res.status(200).json({ success: true })
  } catch {
    console.error("Zoho SMTP delivery failed for contact enquiry.")
    return res.status(502).json({
      error: "We couldn’t send your enquiry just now. Please try again or email sales.team@kalyanimerchantile.tech directly.",
    })
  }
}
