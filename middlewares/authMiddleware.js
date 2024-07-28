import { UnauthenticatedError } from "../errors/index.js"
import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Authentication failed")
    }

    const token = authHeader.split(" ")[1]

    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { userId: data.userId }
    next()
  } catch (err) {
    throw new UnauthenticatedError("Authentication failed")
  }
}
