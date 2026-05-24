import { AppLayout } from "@/shared/components/app-layout"
import { Card } from "@/shared/components/card"

export function SeatMapPageLoading() {
    return (
        <AppLayout>
            <div className="grid grid-cols-1 items-stretch gap-4 p-4 md:grid-cols-2 md:px-8">
                <div>
                    <Card.Skeleton />
                </div>

                <div>
                    <Card.Skeleton />
                </div>

                <div className="md:col-span-2">
                    <Card.Skeleton />
                </div>
            </div>
        </AppLayout>
    )
}
