import { useLoaderData } from "react-router-dom"
import { useSeatMapQuery } from "@/features/seat-selection/api/use-seat-map-query"
import { SeatMapPageLayout } from "@/features/seat-selection/components/seat-map-page-layout"
import { Card } from "@/shared/components/card"
import { ErrorMessage } from "@/shared/components/error-message"
import { Spinner } from "@/shared/components/spinner"
import { getErrorMessage } from "@/shared/lib/get-error-message"

export function SeatSelectionPage() {
    const { mapId } = useLoaderData() as {
        mapId: string
    }

    const { data, isLoading, isError, error } = useSeatMapQuery(mapId)

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-8" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-4">
                <Card>
                    <ErrorMessage message={getErrorMessage(error)} />
                </Card>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="p-4">
                <Card>
                    <ErrorMessage message="Match not found" />
                </Card>
            </div>
        )
    }

    return <SeatMapPageLayout seats={data} />
}
