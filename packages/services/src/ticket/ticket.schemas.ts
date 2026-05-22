import { z } from "zod"

export const TicketResponseSchema = z.object({
    ticketId: z.string(),
})
