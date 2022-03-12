const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    accessToken: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
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
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
      ,
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)
