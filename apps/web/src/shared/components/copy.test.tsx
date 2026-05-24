import { act, fireEvent, render, screen } from "@testing-library/react"
import { toast } from "sonner"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Copy } from "./copy"

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
    },
}))

describe("Copy", () => {
    beforeEach(() => {
        Object.defineProperty(navigator, "clipboard", {
            value: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
            configurable: true,
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.useRealTimers()
    })

    it("copies text and shows success toast", async () => {
        vi.useFakeTimers()
        const { container } = render(<Copy text="TICKET-ID" />)

        const button = screen.getByRole("button")

        expect(container.querySelector("svg.text-success")).not.toBeInTheDocument()

        await act(async () => {
            fireEvent.click(button)
            await Promise.resolve()
        })

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("TICKET-ID")
        expect(toast.success).toHaveBeenCalledWith("copied!")
        expect(container.querySelector("svg.text-success")).toBeInTheDocument()

        act(() => {
            vi.advanceTimersByTime(1500)
        })

        expect(container.querySelector("svg.text-success")).not.toBeInTheDocument()
    })

    it("does nothing when text is missing", async () => {
        render(<Copy />)

        fireEvent.click(screen.getByRole("button"))

        expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
        expect(toast.success).not.toHaveBeenCalled()
    })
})
