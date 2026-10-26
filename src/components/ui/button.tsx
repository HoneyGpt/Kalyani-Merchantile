import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        forest:
          "bg-forest text-white shadow-sm hover:bg-forest-dark focus-visible:ring-forest",
        ghost:
          "bg-transparent text-slate hover:bg-ivory focus-visible:ring-forest",
        gold:
          "bg-gold text-forest-dark hover:bg-[#a68746] focus-visible:ring-gold",
        outline:
          "border border-border bg-white text-slate hover:bg-ivory focus-visible:ring-forest",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "forest",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        {...rest}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
      />
    )
  }
)
Button.displayName = "Button"
