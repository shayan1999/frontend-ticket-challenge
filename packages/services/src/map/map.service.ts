import { get } from "../client/http-client"

import { MapIdsSchema, SeatMapSchema } from "./map.schemas"

export const mapService = {
    async getMaps() {
        const data = await get("/map")

        return MapIdsSchema.parse(data)
    },

    async getMap(mapId: string) {
        const data = await get(`/map/${mapId}`)

        return SeatMapSchema.parse(data)
    },
}
