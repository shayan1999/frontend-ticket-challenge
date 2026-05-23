import type { PropsWithChildren } from "react"
import { cn } from "@/shared/lib/cn"

interface Props extends PropsWithChildren {
    className?: string
}

export function Title({ children, className }: Props) {
    return <p className={cn("font-bold text-lg md:text-xl", className)}>{children}</p>
}
