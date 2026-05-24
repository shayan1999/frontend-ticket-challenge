import { useMutation } from "@tanstack/react-query"

import { ticketService } from "@ticket/services"
import type { PurchaseTicketPayload } from "@ticket/shared-types"

export function usePurchaseTicket() {
    return useMutation({
        mutationFn: ({ mapId, seat }: PurchaseTicketPayload) => ticketService.purchaseTicket(mapId, seat),
    })
}
