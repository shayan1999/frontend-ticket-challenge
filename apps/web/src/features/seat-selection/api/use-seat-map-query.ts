import { useQuery } from "@tanstack/react-query"

import { mapService } from "@ticket/services"

import { queryKeys } from "@/shared/api/query-keys"

export function useSeatMapQuery(mapId: string) {
    return useQuery({
        enabled: Boolean(mapId),
        queryKey: queryKeys.map(mapId ?? ""),
        queryFn: () => mapService.getMap(mapId!),
    })
}
