import type { SeatCoordinate } from "@ticket/shared-types"
import { create } from "zustand"

type SeatMapStore = {
    selectedSeat: SeatCoordinate | null
    mapId?: string | null

    zoom: number

    setSelectedSeat(seat: SeatCoordinate | null): void
    setMapId(mapId: string): void

    zoomIn(): void
    zoomOut(): void
}

const MIN_ZOOM = 0.5
const MAX_ZOOM = 2

export const useSeatMapStore = create<SeatMapStore>((set) => ({
    selectedSeat: null,
    mapId: null,

    zoom: 1,

    setSelectedSeat: (seat) => {
        set((state) => ({
            selectedSeat: state.selectedSeat?.x === seat?.x && state.selectedSeat?.y === seat?.y ? null : seat,
        }))
    },
    setMapId: (mapId) => {
        set({ mapId })
    },
    zoomIn: () => {
        set((state) => ({
            zoom: Math.min(state.zoom + 0.25, MAX_ZOOM),
        }))
    },

    zoomOut: () => {
        set((state) => ({
            zoom: Math.max(state.zoom - 0.25, MIN_ZOOM),
        }))
    },
}))
