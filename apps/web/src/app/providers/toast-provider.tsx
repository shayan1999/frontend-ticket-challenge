import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export function ToastProvider() {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return <Toaster richColors position="bottom-center" theme={isDark ? "dark" : "light"} />
}
