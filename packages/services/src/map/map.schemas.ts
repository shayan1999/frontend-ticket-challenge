import { z } from "zod"

export const MapIdsSchema = z.array(z.string())

export const SeatMapSchema = z.array(z.array(z.union([z.literal(0), z.literal(1)])))
