import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./app/styles/global.css"
import { configureServices } from "@ticket/services"
import { AppProviders } from "@/app/providers/index.tsx"
import { AppRouter } from "@/app/router/index.tsx"
import { env } from "@/shared/config/env.ts"

configureServices({
    apiBaseUrl: env.VITE_API_URL,
})
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <AppRouter />
        </AppProviders>
    </StrictMode>,
)
