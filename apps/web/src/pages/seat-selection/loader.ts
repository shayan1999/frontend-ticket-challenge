import { mapService } from "@ticket/services"

import { queryClient } from "@/shared/api/query-client"
import { queryKeys } from "@/shared/api/query-keys"

export async function seatMapLoader() {
    const maps = await queryClient.fetchQuery({
        queryKey: queryKeys.maps,
        queryFn: () => mapService.getMaps(),
    })

    const randomMap = maps[Math.floor(Math.random() * maps.length)]

    await queryClient.fetchQuery({
        queryKey: queryKeys.map(randomMap),
        queryFn: () => mapService.getMap(randomMap),
    })

    return {
        mapId: randomMap,
    }
}
