import { render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const routeState = vi.hoisted(() => ({
    throwInSeatSelection: false,
}))

vi.mock("@/pages/seat-selection", () => ({
    SeatSelectionPage: () => {
        if (routeState.throwInSeatSelection) {
            throw new Error("seat page crashed")
        }

        return <div>Seat Selection Screen</div>
    },
}))

vi.mock("@/pages/ticket-page", () => ({
    TicketPage: () => <div>Ticket Screen</div>,
}))

describe("AppRouter", () => {
    beforeEach(() => {
        routeState.throwInSeatSelection = false
    })

    afterEach(() => {
        vi.resetModules()
        window.history.pushState({}, "", "/")
    })

    it("renders seat selection page on root route", async () => {
        window.history.pushState({}, "", "/")

        const { AppRouter } = await import("./index")
        render(<AppRouter />)

        expect(await screen.findByText("Seat Selection Screen")).toBeInTheDocument()
    })

    it("renders not found page on unknown route", async () => {
        window.history.pushState({}, "", "/some/unknown/path")

        const { AppRouter } = await import("./index")
        render(<AppRouter />)

        expect(await screen.findByText("404")).toBeInTheDocument()
        expect(screen.getByText("Page not found")).toBeInTheDocument()
    })

    it("renders router error page when route element throws", async () => {
        routeState.throwInSeatSelection = true
        window.history.pushState({}, "", "/")

        const { AppRouter } = await import("./index")
        render(<AppRouter />)

        expect(await screen.findByText("Something went wrong")).toBeInTheDocument()
        expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Reload App" })).toBeInTheDocument()
    })
})
