// import dbConnect, { runMigrations } from "./src/db/db"
import { Elysia } from "elysia"
import router from "./src/router/router"
import { logger } from "./src/middleware/logger"
import cors from "@elysiajs/cors"
// import { initSequenceHandler } from "./src/handlers/sequence"

// Start TXR application

// Declare global variables
const PORT = process.env.BY_PORT || 3100

// Connect to Database and run latest migrations
// const databaseConnection = await dbConnect()
// runMigrations(databaseConnection)

// Initialise sequences
// await initSequenceHandler()


new Elysia()
    .use(cors({
        origin: true
    }))
    .use(logger)
    .use(router)
    .listen(PORT)

console.log(`Server running on http://localhost:${PORT}`)