// import cookieParser from "cookie-parser"
// import cors from "cors"
// import dotenv from "dotenv"
// import express from "express"
// import morgan from "morgan"
// import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
// import { dbConnection } from "./utils/index.js"
// import routes from "./routes/index.js"

// dotenv.config()

// dbConnection()

// const PORT = process.env.PORT || 5000

// const app = express()

// app.use(
//     cors({
//         origin: [ "http://localhost:3000", "http://localhost:3001"],
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         credentials: true,
//     })
// )

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use(cookieParser())

// app.use(morgan("dev"))
// app.use("/api", routes)

// app.use(routeNotFound)
// app.use(errorHandler)

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
import { dbConnection } from "./utils/index.js"
import routes from "./routes/index.js"

dotenv.config()

dbConnection()

const PORT = process.env.PORT || 5000

const app = express()

app.use(
  cors({
    origin: ["https://team-colab-frontend-three.vercel.app/"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(morgan("dev"))

// Add root route to avoid Route not found for '/'
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running on Vercel" })
})

app.use("/api", routes)

app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
