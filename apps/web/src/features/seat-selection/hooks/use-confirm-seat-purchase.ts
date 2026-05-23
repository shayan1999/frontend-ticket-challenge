import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { queryKeys } from "@/shared/api/query-keys"
import { getErrorMessage } from "@/shared/lib/get-error-message"
import { usePurchaseTicket } from "../api/use-purchase-ticket"
import { useSeatMapStore } from "../store/use-seat-map-store"

type UseConfirmSeatPurchaseOptions = {
    mapId: string
    onSuccess?: () => void
}

export function useConfirmSeatPurchase({ mapId, onSuccess }: UseConfirmSeatPurchaseOptions) {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const selectedSeat = useSeatMapStore((state) => state.selectedSeat)

    const setSelectedSeat = useSeatMapStore((state) => state.setSelectedSeat)

    const { mutateAsync, isPending } = usePurchaseTicket()

    async function confirmPurchase() {
        if (!selectedSeat) {
            toast.error("Selected seat not found.")

            return
        }

        try {
            const response = await mutateAsync({
                mapId,
                seat: selectedSeat,
            })

            await queryClient.invalidateQueries({
                queryKey: queryKeys.map(mapId),
            })

            setSelectedSeat(null)

            toast.success("Ticket purchased successfully")

            onSuccess?.()

            navigate(`/ticket/${response.ticketId}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return {
        confirmPurchase,
        isPending,
        selectedSeat,
    }
}
