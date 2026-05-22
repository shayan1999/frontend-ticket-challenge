import { z } from "zod"

const EnvSchema = z.object({
    VITE_API_URL: z.url().catch("http://localhost:3001"),
})

export const env = Object.freeze(EnvSchema.parse(import.meta.env))
