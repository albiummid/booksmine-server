const mongoose = require('mongoose')
const { Schema } = mongoose

const roleSchema = new Schema({
  title: {
    unique: true,
    type: String,
    required: true,
  },
  roleCode: {
    unique: true,
    type: Number,
    required: true,
  },
})

exports.Role = mongoose.model('roles', roleSchema)
