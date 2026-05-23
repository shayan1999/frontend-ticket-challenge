import { Card } from "@/shared/components/card"

export function MapDetails() {
    return (
        <Card title="Match Details" className="h-full">
            <div className="flex w-full flex-col items-center gap-2 rounded bg-primary-background p-2">
                <div className="flex w-full flex-row items-center justify-around">
                    <div className="flex flex-col items-center gap-1">
                        <img src="/images/flags/italy.png" alt="italy" className="h-20 w-20" />
                        <span className="font-bold">Italy</span>
                    </div>
                    <span className="font-bold text-lg text-primary">VS</span>
                    <div className="flex flex-col items-center gap-1">
                        <img src="/images/flags/poland.png" alt="poland" className="h-20 w-20" />
                        <span className="font-bold">Poland</span>
                    </div>
                </div>
                <p>Wednesday 27th May 22:30</p>
            </div>
        </Card>
    )
}
