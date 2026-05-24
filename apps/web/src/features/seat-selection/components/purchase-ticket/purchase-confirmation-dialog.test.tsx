import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { PurchaseConfirmationDialog } from "./purchase-confirmation-dialog"

const confirmPurchaseMock = vi.fn()

const hookState = {
    confirmPurchase: confirmPurchaseMock,
    isPending: false,
    selectedSeat: { x: 2, y: 3 } as { x: number; y: number } | null,
}

vi.mock("../../hooks/use-confirm-seat-purchase", () => ({
    useConfirmSeatPurchase: () => hookState,
}))

vi.mock("../../store/use-seat-map-store", () => ({
    useSeatMapStore: (selector: (state: { mapId: string | null }) => unknown) => selector({ mapId: "map-123" }),
}))

describe("PurchaseConfirmationDialog", () => {
    beforeEach(() => {
        confirmPurchaseMock.mockClear()
        hookState.isPending = false
        hookState.selectedSeat = { x: 2, y: 3 }
    })

    it("opens dialog from trigger and renders seat details", () => {
        render(<PurchaseConfirmationDialog trigger={<button type="button">Open purchase dialog</button>} />)

        fireEvent.click(screen.getByRole("button", { name: "Open purchase dialog" }))

        expect(screen.getByText("Confirm Seat Purchase")).toBeInTheDocument()
        expect(screen.getByText(/row/i)).toHaveTextContent("row 4")
        expect(screen.getByText(/column/i)).toHaveTextContent("column 3")
        expect(screen.getByText("$1")).toBeInTheDocument()
    })

    it("calls confirmPurchase when confirm button is clicked", () => {
        render(<PurchaseConfirmationDialog trigger={<button type="button">Open purchase dialog</button>} />)

        fireEvent.click(screen.getByRole("button", { name: "Open purchase dialog" }))
        fireEvent.click(screen.getByRole("button", { name: "Confirm Purchase" }))

        expect(confirmPurchaseMock).toHaveBeenCalledTimes(1)
    })

    it("disables confirm button when pending", () => {
        hookState.isPending = true

        render(<PurchaseConfirmationDialog trigger={<button type="button">Open purchase dialog</button>} />)

        fireEvent.click(screen.getByRole("button", { name: "Open purchase dialog" }))

        const buttons = screen.getAllByRole("button")
        const confirmButton = buttons.at(-1)

        expect(confirmButton).toBeDisabled()
        expect(confirmButton?.querySelector(".animate-spin")).toBeInTheDocument()
    })

    it("falls back to row 1, column 1 when selected seat is not available", () => {
        hookState.selectedSeat = null

        render(<PurchaseConfirmationDialog trigger={<button type="button">Open purchase dialog</button>} />)

        fireEvent.click(screen.getByRole("button", { name: "Open purchase dialog" }))

        expect(screen.getByText(/Are you sure you want to purchase the seat at row/i)).toHaveTextContent("row 1")
        expect(screen.getByText(/Are you sure you want to purchase the seat at row/i)).toHaveTextContent("column 1")
    })

    it("closes dialog when cancel is clicked", () => {
        render(<PurchaseConfirmationDialog trigger={<button type="button">Open purchase dialog</button>} />)

        fireEvent.click(screen.getByRole("button", { name: "Open purchase dialog" }))
        expect(screen.getByText("Confirm Seat Purchase")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

        expect(screen.queryByText("Confirm Seat Purchase")).not.toBeInTheDocument()
    })
})
