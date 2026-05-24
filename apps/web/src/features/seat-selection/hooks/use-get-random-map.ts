import { useEffect } from "react"
import { useRandomMapQuery } from "../api/use-random-map-query"
import { useSeatMapQuery } from "../api/use-seat-map-query"
import { useSeatMapStore } from "../store/use-seat-map-store"

export function useGetRandomMap() {
    const setMapId = useSeatMapStore((state) => state.setMapId)
    const mapId = useSeatMapStore((state) => state.mapId)
    const { data: mapIdData, isLoading: isMapIdLoading, isError: isMapIdError, error: mapIdError } = useRandomMapQuery(!mapId)

    const {
        data: mapData,
        isLoading: isMapDataLoading,
        isError: isMapDataError,
        error: mapDataError,
    } = useSeatMapQuery(mapId ?? undefined)

    useEffect(() => {
        setMapId(mapIdData ?? "")
    }, [mapIdData, setMapId])

    return {
        mapData,
        mapId,
        isLoading: isMapIdLoading || isMapDataLoading,
        isError: isMapIdError || isMapDataError,
        error: mapIdError || mapDataError,
    }
}
