import { SeatMapPageLayout } from "@/features/seat-selection/components/seat-map-page-layout"
import { SeatMapPageLoading } from "@/features/seat-selection/components/seat-map-page-loading"
import { useGetRandomMap } from "@/features/seat-selection/hooks/use-get-random-map"
import { Card } from "@/shared/components/card"
import { ErrorMessage } from "@/shared/components/error-message"
import { getErrorMessage } from "@/shared/lib/get-error-message"

export function SeatSelectionPage() {
    const { mapData, isLoading, isError, error } = useGetRandomMap()

    if (isLoading) {
        return <SeatMapPageLoading />
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

    if (!mapData) {
        return (
            <div className="p-4">
                <Card>
                    <ErrorMessage message="Match not found" />
                </Card>
            </div>
        )
    }

    return <SeatMapPageLayout seats={mapData} />
}
