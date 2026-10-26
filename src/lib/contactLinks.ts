import { siteConfig } from "@/data/siteConfig"

export function validPhoneHref(value: string): string | null {
  const digits = value.replace(/\D/g, "")
  return digits.length >= 7 && digits.length <= 15 ? `tel:${value}` : null
}

export function validEmailHref(value: string): string | null {
  const email = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : null
}

export function validWhatsAppHref(value: string): string | null {
  const digits = value.replace(/\D/g, "")
  return digits.length >= 8 && digits.length <= 15
    ? `https://wa.me/${digits}`
    : null
}

export function validWebUrl(value: string): string | null {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null
  } catch {
    return null
  }
}

export const configuredPhoneHref = validPhoneHref(siteConfig.phone)
export const configuredEmailHref = validEmailHref(siteConfig.email)
export const configuredWhatsAppHref = validWhatsAppHref(siteConfig.whatsapp)
