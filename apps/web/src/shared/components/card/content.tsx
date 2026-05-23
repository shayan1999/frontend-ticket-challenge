import type { HTMLAttributes } from "react"

import { cn } from "@/shared/lib/cn"

export function Content({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col gap-3", className)} {...props} />
}
