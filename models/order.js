const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const orderListSchema = new Schema({})

const orderSchema = new Schema(
  {
    trxId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['processing', 'pending', 'done'],
    },
    totalBill: {
      type: Number,
      required: true,
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      promoCode: {
        type: String,
      },
    },
    orders: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        author: {
          required: true,
          type: String,
        },
        price: {
          required: true,
          type: Number,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)
module.exports = Mongoose.model('Orders', orderSchema)
