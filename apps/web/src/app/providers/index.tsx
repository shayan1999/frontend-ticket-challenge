import { QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"
import { queryClient } from "@/shared/api/query-client"
import { ErrorBoundaryProvider } from "./error-boundary-provider"
import { ThemeProvider } from "./theme-provider"
import { ToastProvider } from "./toast-provider"

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <ErrorBoundaryProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {children}
                    <ToastProvider />
                </ThemeProvider>
            </QueryClientProvider>
        </ErrorBoundaryProvider>
    )
}
