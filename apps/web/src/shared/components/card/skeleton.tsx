import { cn } from "@/shared/lib/cn"

import { Root } from "./root"

type Props = {
    className?: string
}

export function Skeleton({ className }: Props) {
    return (
        <Root className={cn("animate-pulse space-y-3", className)}>
            <div className="h-6 w-1/3 rounded-md bg-secondary" />

            <div className="h-4 w-full rounded-md bg-secondary" />

            <div className="h-4 w-2/3 rounded-md bg-secondary" />
        </Root>
    )
}
