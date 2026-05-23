import type { SeatCoordinate } from "./seat"

export type PurchaseTicketPayload = {
    mapId: string
    seat: SeatCoordinate
}
