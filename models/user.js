const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
    role: Number,
    userSettings: {
      base: {
        type: String,
        required: true,
      },
      isServer: {
        type: Boolean,
        required: true,
      },
    },
  },
  { timestamps: true }
)

exports.User = mongoose.model('user', userSchema)
