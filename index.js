import { error, log } from "console"
import express from "express"
import "express-async-errors"
import { connect } from "mongoose"
import { AuthRoute } from "./routes/auth.js"
import { JobRoute } from "./routes/job.js"
import { custom404, errorHandler } from "./middlewares/errorHandler.js"
import { auth } from "./middlewares/authMiddleware.js"

import helmet from "helmet"
import cors from "cors"
import erl from "express-rate-limit"

const app = express()

// Security
app.set("trust proxy", 1)
app.use(erl({ windowMs: 5 * 60 * 1000, max: 100 }))
app.use(helmet())
app.use(cors())

// Body Parser
app.use(express.json())

// Routes
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Jobs API</h1>`)
})

app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/jobs", auth, JobRoute)

// Error handlers
app.use(custom404)
app.use(errorHandler)

try {
  const PORT = process.env.PORT || 5000
  await connect(process.env.MONGO_URI)
  app.listen(PORT, () => log(`Server listening on ${PORT}`))
} catch (err) {
  error(err.message)
}
