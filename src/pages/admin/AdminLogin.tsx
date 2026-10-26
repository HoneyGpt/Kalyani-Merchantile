import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shield, ArrowRight } from "lucide-react"
import { login, demoCredentialsHint } from "./auth"
import { Button } from "@/components/ui/button"

export function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      navigate("/admin")
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-sm bg-forest flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-forest-dark">
            Admin
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-forest-dark mb-2">Admin sign in</h2>
        <p className="text-slate mb-6">
          Manage products, categories and quote requests. {demoCredentialsHint()}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate">
              Admin password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-3 border border-border rounded-sm bg-white text-slate focus:outline-none focus:ring-1 focus:ring-forest transition-all"
              required
            />
            {error && (
              <p className="text-xs text-destructive">Please enter a password.</p>
            )}
          </div>
          <p className="text-xs text-slate/50">
            Demonstration only — no real credentials. Connect Supabase Auth for
            production.
          </p>
          <Button type="submit" variant="forest" className="w-full">
            Sign in <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <p className="mt-6 text-xs text-slate/50 text-center">
          Public site:{" "}
          <Link to="/" className="text-forest hover:underline">
            Return to catalogue
          </Link>
        </p>
      </div>
    </div>
  )
}
