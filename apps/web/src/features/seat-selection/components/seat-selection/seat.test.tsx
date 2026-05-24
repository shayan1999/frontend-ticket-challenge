import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Seat } from "./seat"

vi.mock("../../hooks/use-seat-metrics", () => ({
    useSeatMetrics: () => ({
        seatSize: 28,
        seatGap: 6,
        rowHeight: 34,
        zoom: 1,
    }),
}))

describe("Seat", () => {
    it("renders enabled available seat with computed size", () => {
        render(<Seat reserved={false} selected={false} />)

        const seat = screen.getByRole("button")

        expect(seat).toBeEnabled()
        expect(seat).toHaveClass("bg-zinc-300")
        expect(seat).toHaveStyle({ width: "28px", height: "28px" })
    })

    it("renders reserved seat as disabled", () => {
        const onClick = vi.fn()
        render(<Seat reserved selected={false} onClick={onClick} />)

        const seat = screen.getByRole("button")
        fireEvent.click(seat)

        expect(seat).toBeDisabled()
        expect(seat).toHaveClass("bg-zinc-700")
        expect(onClick).not.toHaveBeenCalled()
    })

    it("renders selected seat style", () => {
        render(<Seat reserved={false} selected />)

        expect(screen.getByRole("button")).toHaveClass("bg-success")
        expect(screen.getByRole("button")).toHaveClass("ring-2")
    })
})
