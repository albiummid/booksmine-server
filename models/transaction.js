const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  trxId: {
    type: String,
    required: true,
  },
  trxBalance: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  usedFor: {
    type: Schema.Types.ObjectId,
    ref: 'Orders',
  },
})

module.exports = mongoose.model('Transaction', transactionSchema)
