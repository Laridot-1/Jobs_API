import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
    required: [true, "Please provide an email address"],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please provide a password"],
  },
})

UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  )
}

UserSchema.methods.verifyPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = model("User", UserSchema)

const createUser = (user) => {
  return new Promise((resolve) => {
    const newUser = User.create(user)
    resolve(newUser)
  })
}

const getUser = (email) => {
  return new Promise((resolve) => {
    const user = User.findOne({ email })
    resolve(user)
  })
}

export { createUser, getUser }
