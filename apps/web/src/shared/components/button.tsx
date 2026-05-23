import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "../lib/cn"
import { Spinner } from "./spinner"

const buttonVariants = cva(
    "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:opacity-90",
                secondary: "bg-secondary-background text-foreground hover:opacity-90",
                outline: "border border-border bg-transparent",
                textOnly: "bg-transparent hover:opacity-90",
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4",
                lg: "h-12 px-6",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { loading?: boolean }

export function Button({ className, variant, size, loading, disabled, children, ...props }: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className,
            )}
            {...props}
        >
            {loading ? <Spinner /> : children}
        </button>
    )
}
