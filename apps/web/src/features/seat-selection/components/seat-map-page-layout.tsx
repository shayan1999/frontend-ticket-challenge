import { AppLayout } from "@/shared/components/app-layout"

import { MapDetails } from "./map-details"
import { PurchasePanel } from "./purchase-ticket/purchase-panel"
import { SeatMap } from "./seat-selection/seat-map"

type SeatMapPageLayoutProps = {
    seats: number[][]
}

export function SeatMapPageLayout({ seats }: SeatMapPageLayoutProps) {
    return (
        <AppLayout>
            <div className="grid grid-cols-1 items-stretch gap-4 p-4 md:grid-cols-2 md:px-8">
                <div>
                    <MapDetails />
                </div>

                <div>
                    <PurchasePanel />
                </div>

                <div className="md:col-span-2">
                    <SeatMap seats={seats} />
                </div>
            </div>
        </AppLayout>
    )
}
