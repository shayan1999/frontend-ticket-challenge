import type { PropsWithChildren } from "react"
import { ThemeToggle } from "./theme-toggle"

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-full w-full flex-col gap-2">
            <div className="flex w-full flex-row items-center justify-end border-border border-b bg-paper p-2 shadow-md">
                <ThemeToggle />
            </div>
            {children}
        </div>
    )
}
