import type { SeatCoordinate } from "@ticket/shared-types"

import { useLocation, useParams } from "react-router-dom"

import { TicketSuccessCard } from "@/features/ticket/components/ticket-success-card"

export function TicketPage() {
    const { ticketId } = useParams()

    const { state } = useLocation()

    const seat = (state?.seat as SeatCoordinate) ?? null

    if (!ticketId) {
        return null
    }

    return <TicketSuccessCard ticketId={ticketId} seat={seat} />
}
