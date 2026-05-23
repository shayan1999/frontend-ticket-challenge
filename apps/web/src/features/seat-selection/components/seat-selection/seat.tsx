import { cn } from "@/shared/lib/cn"
import { useSeatMetrics } from "../../hooks/use-seat-metrics"

type SeatProps = {
    reserved: boolean
    selected: boolean
    onClick?(): void
    disabled?: boolean
}

export function Seat({ reserved, selected, onClick }: SeatProps) {
    const { seatSize } = useSeatMetrics()
    return (
        <button
            type="button"
            disabled={reserved}
            onClick={onClick}
            className={cn("shrink-0 rounded-sm transition-colors", {
                "cursor-not-allowed bg-zinc-700": reserved,
                "cursor-pointer bg-success ring-2 ring-success/40": selected,
                "cursor-pointer bg-zinc-300 hover:scale-105 hover:bg-zinc-400": !reserved && !selected,
            })}
            style={{
                width: seatSize,
                height: seatSize,
            }}
        />
    )
}
