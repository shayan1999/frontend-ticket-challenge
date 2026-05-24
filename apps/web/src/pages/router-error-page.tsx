import { isRouteErrorResponse, useRouteError } from "react-router-dom"

import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"

export function RouterErrorPage() {
    const error = useRouteError()

    let title = "Something went wrong"

    let description = "An unexpected error occurred."

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`

        description = typeof error.data === "string" ? error.data : description
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card.Root className="w-full max-w-md gap-6 py-10 text-center">
                <div className="space-y-2">
                    <Card.Title>{title}</Card.Title>

                    <p className="text-muted">{description}</p>
                </div>

                <Button onClick={() => window.location.reload()}>Reload App</Button>
            </Card.Root>
        </div>
    )
}
