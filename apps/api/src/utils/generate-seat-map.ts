type GenerateSeatMapOptions = {
    rows: number
    seatsPerRow: number
    reservedRatio?: number
}

export function generateSeatMap({ rows, seatsPerRow, reservedRatio = 0.3 }: GenerateSeatMapOptions) {
    return Array.from({ length: rows }, () => Array.from({ length: seatsPerRow }, () => (Math.random() < reservedRatio ? 1 : 0)))
}
