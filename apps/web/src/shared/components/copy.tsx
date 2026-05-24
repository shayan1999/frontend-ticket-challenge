import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./button"

interface Props {
    text?: string
}

export function Copy({ text }: Props) {
    const [copied, setCopied] = useState(false)
    async function copyTicketId() {
        if (!text) return
        setCopied(true)
        await navigator.clipboard.writeText(text)
        toast.success("copied!")

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <Button onClick={copyTicketId} variant="textOnly" size="sm">
            {copied ? <CheckIcon size={16} className="text-success" /> : <CopyIcon size={16} />}
        </Button>
    )
}
