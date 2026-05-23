import { useQuery } from "@tanstack/react-query"

import { mapService } from "@ticket/services"

import { queryKeys } from "@/shared/api/query-keys"

export function useRandomMapQuery() {
    return useQuery({
        queryKey: queryKeys.maps,
        queryFn: async () => {
            const maps = await mapService.getMaps()

            const randomIndex = Math.floor(Math.random() * maps.length)

            return maps[randomIndex]
        },
    })
}
