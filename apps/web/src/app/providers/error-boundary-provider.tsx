import type { PropsWithChildren } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "@/shared/components/error-fallback"

export function ErrorBoundaryProvider({ children }: PropsWithChildren) {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}
