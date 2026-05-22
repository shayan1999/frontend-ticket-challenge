import type { SeatMap } from "@ticket/shared-types"

export const maps: Record<string, SeatMap> = {
    m1: [
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
    ],
    m2: [
        [0, 0, 0],
        [1, 0, 1],
        [0, 0, 0],
    ],
}
