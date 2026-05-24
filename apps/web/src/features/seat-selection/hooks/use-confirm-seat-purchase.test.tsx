import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useConfirmSeatPurchase } from "./use-confirm-seat-purchase"

const {
    navigateMock,
    invalidateQueriesMock,
    mutateAsyncMock,
    toastErrorMock,
    toastSuccessMock,
    setSelectedSeatMock,
    storeState,
} = vi.hoisted(() => ({
    navigateMock: vi.fn(),
    invalidateQueriesMock: vi.fn().mockResolvedValue(undefined),
    mutateAsyncMock: vi.fn(),
    toastErrorMock: vi.fn(),
    toastSuccessMock: vi.fn(),
    setSelectedSeatMock: vi.fn(),
    storeState: {} as {
        selectedSeat: { x: number; y: number } | null
        setSelectedSeat: ReturnType<typeof vi.fn>
    },
}))

storeState.selectedSeat = { x: 1, y: 2 }
storeState.setSelectedSeat = setSelectedSeatMock

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock,
}))

vi.mock("@tanstack/react-query", () => ({
    useQueryClient: () => ({
        invalidateQueries: invalidateQueriesMock,
    }),
}))

vi.mock("sonner", () => ({
    toast: {
        error: toastErrorMock,
        success: toastSuccessMock,
    },
}))

vi.mock("../api/use-purchase-ticket", () => ({
    usePurchaseTicket: () => ({
        mutateAsync: mutateAsyncMock,
        isPending: false,
    }),
}))

vi.mock("../store/use-seat-map-store", () => ({
    useSeatMapStore: (selector: (state: typeof storeState) => unknown) => selector(storeState),
}))

describe("useConfirmSeatPurchase", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        storeState.selectedSeat = { x: 1, y: 2 }
    })

    it("returns selectedSeat from store", () => {
        const { result } = renderHook(() => useConfirmSeatPurchase({ mapId: "map-1" }))

        expect(result.current.selectedSeat).toEqual({ x: 1, y: 2 })
    })

    it("shows error and exits when selected seat is missing", async () => {
        storeState.selectedSeat = null
        const { result } = renderHook(() => useConfirmSeatPurchase({ mapId: "map-1" }))

        await act(async () => {
            await result.current.confirmPurchase()
        })

        expect(toastErrorMock).toHaveBeenCalledWith("Selected seat not found.")
        expect(mutateAsyncMock).not.toHaveBeenCalled()
        expect(invalidateQueriesMock).not.toHaveBeenCalled()
        expect(navigateMock).not.toHaveBeenCalled()
    })

    it("handles successful purchase flow", async () => {
        mutateAsyncMock.mockResolvedValueOnce({ ticketId: "ticket-123" })
        const onSuccess = vi.fn()

        const { result } = renderHook(() => useConfirmSeatPurchase({ mapId: "map-abc", onSuccess }))

        await act(async () => {
            await result.current.confirmPurchase()
        })

        expect(mutateAsyncMock).toHaveBeenCalledWith({ mapId: "map-abc", seat: { x: 1, y: 2 } })
        expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ["map", "map-abc"] })
        expect(setSelectedSeatMock).toHaveBeenCalledWith(null)
        expect(toastSuccessMock).toHaveBeenCalledWith("Ticket purchased successfully")
        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(navigateMock).toHaveBeenCalledWith("/ticket/ticket-123", {
            state: {
                seat: { x: 1, y: 2 },
                mapId: "map-abc",
            },
        })
    })

    it("shows mapped error message when purchase fails", async () => {
        mutateAsyncMock.mockRejectedValueOnce(new Error("Request failed"))
        const { result } = renderHook(() => useConfirmSeatPurchase({ mapId: "map-1" }))

        await act(async () => {
            await result.current.confirmPurchase()
        })

        expect(toastErrorMock).toHaveBeenCalledWith("Request failed")
        expect(setSelectedSeatMock).not.toHaveBeenCalled()
        expect(navigateMock).not.toHaveBeenCalled()
    })
})
