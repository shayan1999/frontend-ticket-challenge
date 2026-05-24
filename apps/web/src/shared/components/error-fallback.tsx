import type { FallbackProps } from "react-error-boundary"

import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card.Root className="w-full max-w-md gap-4">
                <div className="space-y-1">
                    <Card.Title>Something went wrong</Card.Title>

                    <p className="text-muted">An unexpected error occurred.</p>
                </div>

                <pre className="overflow-auto rounded-md bg-background p-3 text-danger text-sm">{(error as Error).message}</pre>

                <Button onClick={resetErrorBoundary}>Try Again</Button>
            </Card.Root>
        </div>
    )
}
