/**
 * Demo authentication layer.
 *
 * This is a frontend-only demonstration guard. There is no backend connected,
 * so no real credentials exist — any non-empty password is accepted in demo
 * mode and the session is stored in localStorage only.
 *
 * Path to production: replace this module with Supabase Auth (auth.signInWith
 * via OAuth/email), protect routes with Supabase RLS on products, categories
 * and quote-requests tables, and call admin APIs through an edge function.
 * Never place Supabase service-role or private keys in frontend code.
 */
const TOKEN_KEY = "km-admin-demo-session"

export function isAuthenticated(): boolean {
  try {
    return !!localStorage.getItem(TOKEN_KEY)
  } catch {
    return false
  }
}

export function login(password: string): boolean {
  // Demo: accept any password. Replace with real authentication.
  if (password.trim().length > 0) {
    try {
      localStorage.setItem(TOKEN_KEY, "demo-session")
    } catch {}
    return true
  }
  return false
}

export function logout(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {}
}

export function demoCredentialsHint(): string {
  return "Demo mode: enter any password to enter the admin area."
}
