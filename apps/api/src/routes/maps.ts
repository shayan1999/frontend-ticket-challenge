import { Router } from "express"
import { maps } from "../data/maps"

const router = Router()

router.get("/", (_, res) => {
    res.json(Object.keys(maps))
})

router.get("/:id", (req, res) => {
    const map = maps[req.params.id]

    if (!map) {
        return res.status(404).json({
            message: "Map not found",
        })
    }

    res.json(map)
})

export default router
