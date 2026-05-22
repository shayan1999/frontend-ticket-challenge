import type { SeatCoordinate } from "@ticket/shared-types"
import { post } from "../client/http-client"

import { TicketResponseSchema } from "./ticket.schemas"

type PurchaseTicketBody = SeatCoordinate

export const ticketService = {
    async purchaseTicket(mapId: string, body: PurchaseTicketBody) {
        const data = await post(`/map/${mapId}/ticket`, body)

        return TicketResponseSchema.parse(data)
    },
}
