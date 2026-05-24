import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useSeatMapStore } from "../../store/use-seat-map-store"
import { SeatRow } from "./seat-row"

vi.mock("../../hooks/use-seat-metrics", () => ({
    useSeatMetrics: () => ({
        seatGap: 8,
        seatSize: 20,
        rowHeight: 28,
        zoom: 1,
    }),
}))

vi.mock("./seat", () => ({
    Seat: ({ reserved, selected, onClick }: { reserved: boolean; selected: boolean; onClick?: () => void }) => (
        <button
            type="button"
            data-testid="seat"
            data-reserved={String(reserved)}
            data-selected={String(selected)}
            onClick={onClick}
        />
    ),
}))

describe("SeatRow", () => {
    beforeEach(() => {
        useSeatMapStore.setState({ selectedSeat: null, mapId: null, zoom: 1 })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it("maps row seats to Seat props", () => {
        render(<SeatRow row={[0, 1, 0]} rowIndex={2} />)

        const seats = screen.getAllByTestId("seat")

        expect(seats).toHaveLength(3)
        expect(seats[0]).toHaveAttribute("data-reserved", "false")
        expect(seats[1]).toHaveAttribute("data-reserved", "true")
        expect(seats[2]).toHaveAttribute("data-reserved", "false")
    })

    it("marks the currently selected seat", () => {
        useSeatMapStore.setState({ selectedSeat: { x: 2, y: 1 } })

        render(<SeatRow row={[0, 0, 0]} rowIndex={1} />)

        const seats = screen.getAllByTestId("seat")

        expect(seats[0]).toHaveAttribute("data-selected", "false")
        expect(seats[1]).toHaveAttribute("data-selected", "false")
        expect(seats[2]).toHaveAttribute("data-selected", "true")
    })

    it("sets selected seat coordinates on click", () => {
        render(<SeatRow row={[0, 0]} rowIndex={3} />)

        fireEvent.click(screen.getAllByTestId("seat")[1])

        expect(useSeatMapStore.getState().selectedSeat).toEqual({ x: 1, y: 3 })
    })
})
