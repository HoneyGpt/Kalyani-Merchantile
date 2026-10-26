import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AdminLayout } from "@/pages/admin/AdminLayout"
import { isAuthenticated } from "@/pages/admin/auth"

const Home = lazy(() => import("@/pages/Home").then((module) => ({ default: module.Home })))
const Products = lazy(() => import("@/pages/Products").then((module) => ({ default: module.Products })))
const ProductDetail = lazy(() => import("@/pages/ProductDetail").then((module) => ({ default: module.ProductDetail })))
const CategoryDetail = lazy(() => import("@/pages/CategoryDetail").then((module) => ({ default: module.CategoryDetail })))
const Contact = lazy(() => import("@/pages/Contact").then((module) => ({ default: module.Contact })))
const About = lazy(() => import("@/pages/About").then((module) => ({ default: module.About })))
const Industries = lazy(() => import("@/pages/Industries").then((module) => ({ default: module.Industries })))
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin").then((module) => ({ default: module.AdminLogin })))
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts").then((module) => ({ default: module.AdminProducts })))
const AdminProductPreview = lazy(() => import("@/pages/admin/AdminProductPreview").then((module) => ({ default: module.AdminProductPreview })))
const AdminQuoteRequests = lazy(() => import("@/pages/admin/AdminQuoteRequests").then((module) => ({ default: module.AdminQuoteRequests })))
const AdminCategories = lazy(() => import("@/pages/admin/AdminCategories").then((module) => ({ default: module.AdminCategories })))


function RequireDemoAdmin({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function AppRoutes() {
  const { pathname, hash } = useLocation()
  const isAdminRoute = pathname.startsWith("/admin")

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) {
        const targetId = decodeURIComponent(hash.slice(1))
        document.getElementById(targetId)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        })
      } else {
        window.scrollTo({ top: 0, behavior: "auto" })
      }
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<div role="status" className="mx-auto max-w-7xl px-6 py-20 text-sm text-slate">Loading page…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories/:slug" element={<CategoryDetail />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route
          path="/admin/login"
          element={isAuthenticated() ? <Navigate to="/admin" replace /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={
            <RequireDemoAdmin>
              <AdminLayout><AdminProducts /></AdminLayout>
            </RequireDemoAdmin>
          }
        />
        <Route
          path="/admin/products"
          element={
            <RequireDemoAdmin>
              <AdminLayout><AdminProducts /></AdminLayout>
            </RequireDemoAdmin>
          }
        />
        <Route
          path="/admin/products/preview/:slug"
          element={
            <RequireDemoAdmin>
              <AdminLayout><AdminProductPreview /></AdminLayout>
            </RequireDemoAdmin>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RequireDemoAdmin>
              <AdminLayout><AdminCategories /></AdminLayout>
            </RequireDemoAdmin>
          }
        />
        <Route
          path="/admin/quotes"
          element={
            <RequireDemoAdmin>
              <AdminLayout><AdminQuoteRequests /></AdminLayout>
            </RequireDemoAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
