import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./button"

describe("Button", () => {
    it("renders children and applies default variant/size classes", () => {
        render(<Button>Save</Button>)

        const button = screen.getByRole("button", { name: "Save" })

        expect(button).toBeInTheDocument()
        expect(button).toHaveClass("bg-primary")
        expect(button).toHaveClass("h-10")
    })

    it("applies passed variant, size, and custom className", () => {
        render(
            <Button variant="outline" size="lg" className="custom-class">
                Submit
            </Button>,
        )

        const button = screen.getByRole("button", { name: "Submit" })

        expect(button).toHaveClass("border")
        expect(button).toHaveClass("h-12")
        expect(button).toHaveClass("custom-class")
    })

    it("disables when loading and renders spinner instead of children", () => {
        render(<Button loading>Save</Button>)

        const button = screen.getByRole("button")

        expect(button).toBeDisabled()
        expect(screen.queryByText("Save")).not.toBeInTheDocument()
        expect(button.querySelector(".animate-spin")).toBeInTheDocument()
    })

    it("calls onClick when enabled", () => {
        const onClick = vi.fn()

        render(<Button onClick={onClick}>Click me</Button>)

        fireEvent.click(screen.getByRole("button", { name: "Click me" }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it("does not call onClick when disabled", () => {
        const onClick = vi.fn()

        render(
            <Button onClick={onClick} disabled>
                Disabled
            </Button>,
        )

        fireEvent.click(screen.getByRole("button", { name: "Disabled" }))

        expect(onClick).not.toHaveBeenCalled()
    })
})
