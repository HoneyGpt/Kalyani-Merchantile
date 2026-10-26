import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

function BranchSymbol({ light = false }: { light?: boolean }) {
  const ink = light ? "#F7F5EF" : "#173D2B"
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18 31V18m0 6-7-7m7 4 7-7m-7 3-5-5m5 10 6 6" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="11" r="2.5" fill="#B99A5A" />
      <circle cx="26" cy="14" r="2.5" fill="#B99A5A" />
      <circle cx="11" cy="17" r="2.5" fill="#B99A5A" />
      <circle cx="24" cy="30" r="2.5" fill="#B99A5A" />
      <circle cx="18" cy="15" r="2.5" fill="#B99A5A" />
    </svg>
  )
}

export function Logo({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const light = variant === "light"
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 shrink-0", className)}
      aria-label="Kalyani Mercantile — home"
    >
      <BranchSymbol light={light} />
      <span className={cn(
        "font-display font-bold text-[15px] sm:text-base tracking-[0.08em]",
        light ? "text-ivory" : "text-forest-dark"
      )}>
        KALYANI <span className={light ? "text-gold" : "text-forest"}>MERCANTILE</span>
      </span>
    </Link>
  )
}

export default Logo
