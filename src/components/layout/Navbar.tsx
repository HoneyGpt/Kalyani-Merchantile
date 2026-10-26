import { useState } from "react"
import { Link, NavLink as RouterNavLink } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import { siteConfig } from "@/data/siteConfig"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnnouncementStrip } from "./AnnouncementStrip"
import { Logo } from "./Logo"

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RouterNavLink
      to={to}
      end={to === "/"}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "text-slate font-medium text-sm hover:text-forest transition-colors",
          isActive && "text-forest"
        )
      }
    >
      {children}
    </RouterNavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = siteConfig.navigation.filter((item) => item.label !== "Home")

  return (
    <>
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-border">
        <AnnouncementStrip />
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <Logo />
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                  <NavLink to="/">Home</NavLink>
                  {navItems.map((item) => (
                    <NavLink key={item.href} to={item.href}>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/products">
                    <Search className="w-4 h-4 mr-2" />
                    Search catalogue
                  </Link>
                </Button>
                <Button variant="forest" size="lg" asChild>
                  <Link to="/contact">Request a Quote</Link>
                </Button>
              </div>
              <button
                className="md:hidden inline-flex items-center justify-center p-2 text-slate hover:text-forest"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-white"
      role="dialog"
      aria-modal="true"
    >
      <div id="mobile-navigation" className="flex h-full flex-col">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <Logo className="w-auto" />
          <button
            onClick={onClose}
            className="text-slate hover:text-forest"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
          <RouterNavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              cn("block text-forest font-medium py-3", isActive && "bg-ivory")
            }
          >
            Home
          </RouterNavLink>
          {siteConfig.navigation
            .filter((item) => item.label !== "Home")
            .map((item) => (
              <RouterNavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "block text-slate font-medium py-3 hover:text-forest",
                    isActive && "text-forest bg-ivory"
                  )
                }
              >
                {item.label}
              </RouterNavLink>
            ))}
        </nav>
        <div className="px-6 pb-8">
          <Button variant="forest" asChild className="w-full">
            <Link to="/contact" onClick={onClose}>Request a Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
