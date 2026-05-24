import type { SeatCoordinate } from "@ticket/shared-types"
import { CheckCircle2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"
import { Copy } from "@/shared/components/copy"

interface Props {
    ticketId: string
    seat?: SeatCoordinate | null
}

export function TicketSuccessCard({ ticketId, seat }: Props) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card.Root className="w-full max-w-lg items-center gap-6 py-10 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2Icon className="text-success" size={32} />
                </div>

                <div className="space-y-2">
                    <Card.Title>Ticket Purchased</Card.Title>

                    <p className="text-muted">Your ticket has been confirmed successfully.</p>
                    {seat ? (
                        <p className="font-light text-muted text-sm">
                            (row: {seat.y + 1} • column: {seat.x + 1})
                        </p>
                    ) : null}
                </div>

                <div className="flex w-full flex-col rounded-xl border border-border bg-background p-4">
                    <span className="text-muted text-sm">Ticket ID</span>
                    <div className="flex flex-row items-center gap-2">
                        <span className="mt-1 font-mono font-semibold text-lg">{ticketId}</span>
                        <div className="border-border border-s">
                            <Copy text={ticketId} />
                        </div>
                    </div>
                </div>

                <Button className="w-full">
                    <Link to="/">Back To Seats</Link>
                </Button>
            </Card.Root>
        </div>
    )
}
