import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const isDark = theme === "dark"

    return (
        <Button onClick={() => setTheme(isDark ? "light" : "dark")} size="sm" variant="outline">
            {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
        </Button>
    )
}
