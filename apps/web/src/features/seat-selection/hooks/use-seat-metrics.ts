import { useMemo } from "react"

import { useSeatMapStore } from "../store/use-seat-map-store"

const BASE_SEAT_SIZE = 20
const BASE_SEAT_GAP = 4

export function useSeatMetrics() {
    const zoom = useSeatMapStore((state) => state.zoom)

    return useMemo(() => {
        const seatSize = BASE_SEAT_SIZE * zoom

        const seatGap = BASE_SEAT_GAP * zoom

        return {
            zoom,
            seatSize,
            seatGap,
            rowHeight: seatSize + seatGap,
        }
    }, [zoom])
}
