import { Router } from "express"
import { maps } from "../data/maps"

const router = Router()

router.post("/:id/ticket", (req, res) => {
    const map = maps[req.params.id]

    if (!map) {
        return res.status(404).json({
            message: "Map not found",
        })
    }

    const { x, y } = req.body

    if (map[y]?.[x] === 1) {
        return res.status(409).json({
            message: "Seat already reserved",
        })
    }
    if (Math.random() < 0.2) {
        return res.status(409).json({
            message: "Seat already reserved (random error)",
        })
    }

    map[y][x] = 1

    return res.json({
        ticketId: crypto.randomUUID(),
    })
})

export default router
