import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { type ReactNode, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Button } from "@/shared/components/button"
import { useConfirmSeatPurchase } from "../hooks/use-confirm-seat-purchase"

interface Props {
    trigger: ReactNode
}

export function PurchaseConfirmationDialog({ trigger }: Props) {
    const [open, setOpen] = useState(false)
    const { mapId } = useLoaderData() as {
        mapId: string
    }
    const { confirmPurchase, isPending, selectedSeat } = useConfirmSeatPurchase({
        mapId,
        onSuccess: () => setOpen(false),
    })

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-paper p-6 text-foreground shadow-xl">
                    <div className="flex flex-row items-start justify-between">
                        <Dialog.Title>Confirm Seat Purchase</Dialog.Title>
                        <Dialog.Close asChild>
                            <Button variant="textOnly" size="sm">
                                <XIcon size={18} />
                            </Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className="mt-3 text-muted">
                        Are you sure you want to purchase the seat at row <b>{selectedSeat?.y ?? 1}</b>, column{" "}
                        <b>{selectedSeat?.x ?? 1}</b> for <b>$1</b>?
                    </Dialog.Description>
                    <div className="mt-6 flex justify-end gap-3">
                        <Dialog.Close asChild>
                            <Button variant="secondary">Cancel</Button>
                        </Dialog.Close>
                        <Button
                            onClick={confirmPurchase}
                            loading={isPending}
                            variant="primary"
                            className="bg-success text-success-foreground"
                        >
                            Confirm Purchase
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
