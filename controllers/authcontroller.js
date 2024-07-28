import { createUser, getUser } from "../models/userModel.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

const handleLoginRoute = async (req, res) => {
  const { email, password } = req.body

  if (!email?.trim() || !password?.trim()) {
    throw new BadRequestError("Please fill all fields")
  }

  const user = await getUser(email)

  if (!user) {
    throw new UnauthenticatedError(`Invalid credentials`)
  }

  const cmp = await user.verifyPassword(password)

  if (!cmp) {
    throw new UnauthenticatedError(`Invalid credentials`)
  }

  const token = user.createJwt()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const handleRegisterRoute = async (req, res) => {
  const user = await createUser(req.body)
  const token = user.createJwt()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

export { handleRegisterRoute, handleLoginRoute }
