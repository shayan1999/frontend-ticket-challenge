import cors from "cors"
import express from "express"
import mapRoutes from "./routes/maps"
import ticketRoutes from "./routes/tickets"

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.use("/map", mapRoutes)
app.use("/map", ticketRoutes)

app.listen(PORT, () => {
    console.log(`API running on port: ${PORT}`)
})
