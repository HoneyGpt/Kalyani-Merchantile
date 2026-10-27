import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string
  variant?: "dark" | "light"
}) {
  const src = variant === "light"
    ? "/images/brand/kalyani-mercantile-horizontal-light.png"
    : "/images/brand/kalyani-mercantile-horizontal.png"

  return (
    <Link
      to="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Kalyani Mercantile — home"
    >
      <img
        src={src}
        alt="Kalyani Mercantile — Procurement and Supply Solutions"
        className="h-11 w-auto max-w-[220px] object-contain sm:h-12"
        width="436"
        height="100"
        decoding="async"
      />
    </Link>
  )
}

export default Logo
