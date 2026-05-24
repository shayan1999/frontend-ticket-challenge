import { afterEach, describe, expect, it, vi } from "vitest"

describe("env", () => {
    afterEach(() => {
        vi.unstubAllEnvs()
        vi.resetModules()
    })

    it("uses provided VITE_API_URL when valid", async () => {
        vi.stubEnv("VITE_API_URL", "https://api.example.com")

        const { env } = await import("./env")

        expect(env.VITE_API_URL).toBe("https://api.example.com")
    })

    it("falls back to localhost URL when VITE_API_URL is invalid", async () => {
        vi.stubEnv("VITE_API_URL", "not-a-valid-url")

        const { env } = await import("./env")

        expect(env.VITE_API_URL).toBe("http://localhost:3001")
    })
})
