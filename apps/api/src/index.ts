import cors from "cors"
import express from "express"

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.listen(PORT, () => {
    console.log(`API running on port: ${PORT}`)
})
