import { describe, expect, it } from "vitest"
import { getErrorMessage } from "./get-error-message"

describe("getErrorMessage", () => {
    it("returns message for Error instances", () => {
        expect(getErrorMessage(new Error("Network failed"))).toBe("Network failed")
    })

    it("returns fallback message for invalid values", () => {
        expect(getErrorMessage("oops")).toBe("Something went wrong")
        expect(getErrorMessage({ message: "nope" })).toBe("Something went wrong")
        expect(getErrorMessage(null)).toBe("Something went wrong")
    })
})
