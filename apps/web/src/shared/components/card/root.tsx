import type { HTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export function Root({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn(`flex flex-col gap-3 rounded-lg border border-border bg-paper p-4`, className)} {...props} />
}
