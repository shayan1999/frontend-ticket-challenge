import { QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"
import { queryClient } from "@/shared/api/query-client"
import { ThemeProvider } from "./theme-provider"
import { ToastProvider } from "./toast-provider"

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
                <ToastProvider />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
