import { memo } from "react"
import { useSeatMetrics } from "../../hooks/use-seat-metrics"
import { useSeatMapStore } from "../../store/use-seat-map-store"
import { Seat } from "./seat"

type SeatRowProps = {
    row: number[]
    rowIndex: number
}

function SeatRowComponent({ row, rowIndex }: SeatRowProps) {
    const selectedSeat = useSeatMapStore((state) => state.selectedSeat)
    const setSelectedSeat = useSeatMapStore((state) => state.setSelectedSeat)
    const { seatGap } = useSeatMetrics()
    return (
        <div className="flex w-max" style={{ gap: seatGap }}>
            {row.map((seat, seatIndex) => {
                const selected = selectedSeat?.x === seatIndex && selectedSeat?.y === rowIndex

                return (
                    <Seat
                        // biome-ignore lint/suspicious/noArrayIndexKey: <here we are combining it with row id which makes it good idea>
                        key={`${rowIndex}-${seatIndex}`}
                        reserved={seat === 1}
                        selected={selected}
                        onClick={() =>
                            setSelectedSeat({
                                x: seatIndex,
                                y: rowIndex,
                            })
                        }
                    />
                )
            })}
        </div>
    )
}

export const SeatRow = memo(SeatRowComponent)
