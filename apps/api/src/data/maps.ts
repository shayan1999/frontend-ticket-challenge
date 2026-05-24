import type { SeatMap } from "@ticket/shared-types"
import { generateSeatMap } from "../utils/generate-seat-map"

export const maps: Record<string, SeatMap> = {
    m1: generateSeatMap({
        rows: 1000,
        seatsPerRow: 100,
    }),
    m2: generateSeatMap({
        rows: 500,
        seatsPerRow: 200,
    }),
    m3: generateSeatMap({
        rows: 100,
        seatsPerRow: 100,
    }),
    m4: generateSeatMap({
        rows: 10,
        seatsPerRow: 50,
    }),
}
