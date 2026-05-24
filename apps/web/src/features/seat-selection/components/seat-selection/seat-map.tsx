import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"
import { useSeatMetrics } from "../../hooks/use-seat-metrics"
import { useSeatMapStore } from "../../store/use-seat-map-store"
import { Seat } from "./seat"
import { SeatRow } from "./seat-row"

type SeatMapProps = {
    seats: number[][]
}

export function SeatMap({ seats }: SeatMapProps) {
    const zoomIn = useSeatMapStore((state) => state.zoomIn)
    const zoomOut = useSeatMapStore((state) => state.zoomOut)
    const { rowHeight } = useSeatMetrics()
    return (
        <Card.Root className="relative flex h-[50vh] touch-pan-x flex-col overflow-auto overscroll-contain">
            <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList key={rowHeight} height={height} width={width} itemCount={seats.length} itemSize={rowHeight}>
                        {({ index, style }) => (
                            <div style={style}>
                                <SeatRow row={seats[index]} rowIndex={index} />
                            </div>
                        )}
                    </FixedSizeList>
                )}
            </AutoSizer>
            <div className="absolute right-6 bottom-8 flex flex-col items-center gap-2 rounded-lg bg-foreground p-1">
                <Button onClick={zoomIn} variant="secondary" size="sm">
                    +
                </Button>
                <Button onClick={zoomOut} variant="secondary" size="sm">
                    -
                </Button>
            </div>
            <div className="absolute bottom-8 left-6 flex flex-col items-center gap-2 rounded-lg bg-background-foreground p-1">
                <div className="flex flex-row items-center gap-2 text-foreground-background">
                    <Seat reserved={false} selected={false} />{" "}
                    <span className="font-semibold text-foreground-background text-xs">Available</span>
                </div>
                <div className="flex flex-row items-center gap-2 text-foreground-background">
                    <Seat reserved={true} selected={false} />{" "}
                    <span className="font-semibold text-foreground-background text-xs">Reserved</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Seat reserved={false} selected={true} />{" "}
                    <span className="font-semibold text-foreground-background text-xs">Selected</span>
                </div>
            </div>
        </Card.Root>
    )
}
