import { Link, useNavigate, useLocation } from "react-router-dom"
import { LogOut, FileText, Package, Shield } from "lucide-react"
import { logout } from "./auth"
import { Button } from "@/components/ui/button"

const adminRoutes = [
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FileText },
  { label: "Quote Requests", href: "/admin/quotes", icon: Shield },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-white border-l border-border">
      <aside className="relative z-30 w-full border-b border-border bg-white md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-8 h-8 rounded-sm bg-forest flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight text-forest-dark">
            Admin
          </span>
        </div>
        <nav className="mt-2 flex flex-wrap gap-1 px-3 pb-4 md:block md:space-y-1">
          {adminRoutes.map((route) => {
            const Icon = route.icon
            const active = location.pathname === route.href
            return (
              <Link
                key={route.label}
                to={route.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors ${
                  active
                    ? "bg-ivory text-forest font-medium"
                    : `text-slate hover:bg-ivory hover:text-forest`
                }`}
              >
                <Icon className="w-4 h-4" />
                {route.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border md:absolute md:bottom-0 md:left-0 md:right-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full text-slate"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </aside>
      <div className="md:pl-64 p-6 lg:p-10">
        {children}
      </div>
    </div>
  )
}
