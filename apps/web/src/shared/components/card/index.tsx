import type { ReactNode } from "react"
import { cn } from "@/shared/lib/cn"
import { Root as CardRoot } from "./root"
import { Title as CardTitle } from "./title"

export function Card({ children, title, className }: Card.Props) {
    return (
        <CardRoot className={cn("flex flex-col gap-2", className)}>
            <CardTitle>{title}</CardTitle>
            {children}
        </CardRoot>
    )
}

export namespace Card {
    export const Root = CardRoot
    export const Title = CardTitle
    export type Props = {
        title?: string
        children?: ReactNode
        className?: string
    }
}
