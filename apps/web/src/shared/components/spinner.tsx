import { cn } from "../lib/cn"

type SpinnerProps = {
    className?: string
}

export function Spinner({ className }: SpinnerProps) {
    return <div className={cn(`size-4 animate-spin rounded-full border-2 border-foreground border-t-primary`, className)} />
}
