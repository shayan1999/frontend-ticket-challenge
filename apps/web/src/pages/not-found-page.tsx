import { Link } from "react-router-dom"

import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card.Root className="w-full max-w-md items-center gap-6 py-10 text-center">
                <div className="space-y-2">
                    <p className="font-bold text-6xl text-primary">404</p>

                    <Card.Title>Page not found</Card.Title>

                    <p className="text-muted">The page you are looking for does not exist.</p>
                </div>

                <Button>
                    <Link to="/">Back Home</Link>
                </Button>
            </Card.Root>
        </div>
    )
}
