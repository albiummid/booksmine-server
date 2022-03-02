const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { Book, bookSchema } = require('./book')

const favoriteSchema = new Schema({
  bookId: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'books',
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
  },
})

const book = mongoose.model('books', bookSchema)

module.exports = mongoose.model('Favorite', favoriteSchema)
