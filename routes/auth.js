import {
  handleRegisterRoute,
  handleLoginRoute,
} from "../controllers/authcontroller.js"
import express from "express"

export const AuthRoute = express.Router()

AuthRoute.route("/register").post(handleRegisterRoute)

AuthRoute.route("/login").post(handleLoginRoute)
