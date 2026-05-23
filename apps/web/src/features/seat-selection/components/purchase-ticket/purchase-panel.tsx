import { CircleAlert } from "lucide-react"
import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"
import { useSeatMapStore } from "../../store/use-seat-map-store"
import { PurchaseConfirmationDialog } from "./purchase-confirmation-dialog"

export function PurchasePanel() {
    const selectedSeat = useSeatMapStore((state) => state.selectedSeat)
    const setSelectSeat = useSeatMapStore((state) => state.setSelectedSeat)
    return (
        <Card.Root className="h-full">
            <Card.Title>Selected seat</Card.Title>

            {selectedSeat ? (
                <Card.Content className="h-full justify-between">
                    <div className="flex flex-row items-center justify-around gap-2">
                        <span>
                            <b>column:</b> {selectedSeat.x + 1}
                        </span>
                        <span>
                            <b>row:</b> {selectedSeat.y + 1}
                        </span>
                        <span>
                            <b>cost:</b> 1$
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex w-fit flex-row items-center gap-2 rounded p-1 px-2">
                            <CircleAlert className="text-warning" />{" "}
                            <p className="text-warning">Check your seat location before processed.</p>
                        </div>
                        <div className="flex w-full flex-row items-center justify-end gap-2">
                            <Button onClick={() => setSelectSeat(null)} variant="secondary" className="flex-1">
                                Cancel
                            </Button>
                            <PurchaseConfirmationDialog trigger={<Button className="flex-1">Purchase</Button>} />
                        </div>
                    </div>
                </Card.Content>
            ) : (
                <Card.Content>
                    <p>Please select a seat from the seats map</p>
                </Card.Content>
            )}
        </Card.Root>
    )
}
