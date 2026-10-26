import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Link as LinkIcon, Clock } from "lucide-react"
import { siteConfig } from "@/data/siteConfig"
import { configuredEmailHref, configuredPhoneHref, configuredWhatsAppHref, validWebUrl } from "@/lib/contactLinks"
import { Logo } from "./Logo"

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-slate/80 text-sm hover:text-forest transition-colors"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const hasPhone = !!configuredPhoneHref
  const hasEmail = !!configuredEmailHref
  const hasWhatsApp = !!configuredWhatsAppHref
  const hasAddress = !!siteConfig.address
  const hasHours = !!siteConfig.businessHours
  const hasRegistration = !!siteConfig.gstin || !!siteConfig.udyam
  const socialLinks = {
    website: validWebUrl(siteConfig.social.website),
    linkedin: validWebUrl(siteConfig.social.linkedin),
    instagram: validWebUrl(siteConfig.social.instagram),
    twitter: validWebUrl(siteConfig.social.twitter),
  }
  const hasSocial = Object.values(socialLinks).some(Boolean)

  return (
    <footer className="border-t border-border bg-forest-dark text-ivory">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="light" className="mb-4" />
            <p className="text-ivory/80 text-sm leading-relaxed max-w-xs">
              Procurement and supply solutions for businesses across India.
              We help organisations source equipment and products with clear
              communication and dependable coordination.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            {hasPhone && (
              <div className="flex items-start gap-3 mb-4 text-sm text-ivory/90">
                <Phone className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <a
                  href={configuredPhoneHref || undefined}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            )}
            {hasEmail && (
              <div className="flex items-start gap-3 mb-4 text-sm text-ivory/90">
                <Mail className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <a
                  href={configuredEmailHref || undefined}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            )}
            {hasWhatsApp && (
              <div className="flex items-start gap-3 mb-4 text-sm text-ivory/90">
                <LinkIcon className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <a
                  href={configuredWhatsAppHref || undefined}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            )}
            {hasAddress && (
              <div className="flex items-start gap-3 mb-4 text-sm text-ivory/90">
                <MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            )}
            {hasHours && (
              <div className="flex items-start gap-3 mb-6 text-sm text-ivory/90">
                <Clock className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span>{siteConfig.businessHours}</span>
              </div>
            )}
            {hasRegistration && (
              <div className="mb-6 space-y-1 text-xs text-ivory/70">
                {siteConfig.gstin && <p>GSTIN: {siteConfig.gstin}</p>}
                {siteConfig.udyam && <p>Udyam: {siteConfig.udyam}</p>}
              </div>
            )}
            {hasSocial && (
              <div className="flex gap-4">
              {socialLinks.website && (
                <a
                  href={socialLinks.website || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-white transition-colors"
                  aria-label="Website"
                >
                  Website
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                    href={socialLinks.linkedin || undefined}
                    target="_blank"
                    rel="noopener"
                    className="text-ivory/60 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram || undefined}
                    target="_blank"
                    rel="noopener"
                    className="text-ivory/60 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter || undefined}
                    target="_blank"
                    rel="noopener"
                    className="text-ivory/60 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    X
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              <FooterLink to="/products">Product Catalogue</FooterLink>
              <FooterLink to="/industries">Industries Served</FooterLink>
              <FooterLink to="/about">Our Approach</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Start a sourcing request</h3>
            <p className="text-ivory/80 text-sm leading-relaxed mb-6">
              Share your product requirement — model, quantity, delivery
              location and specifications — and we&rsquo;ll help you take the
              next step.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-white transition-colors">
              Submit a Requirement
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-forest/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/50">
          <span>
            {siteConfig.name}. Procurement &amp; Supply Solutions.
          </span>
          <span>
            Configurable contact, registration and social details are managed
            in site configuration. Empty fields are not shown publicly.
          </span>
        </div>
      </div>
    </footer>
  )
}
