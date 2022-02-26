const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter book title'],
      trim: true,
      maxLength: [50, 'Title cannot exceed 50 charecters'],
    },
    author: {
      type: String,
      required: [true, 'Please enter author name'],
    },
    imgUrl: {
      type: String,
      required: [true, 'Please give image URL  '],
    },
    ratings: {
      type: Number,
      required: false,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter price '],
    },
    discount: {
      type: Number,
      required: [true, 'Please enter discount '],
    },
    discountDuration: {
      type: Object,
      startAt: {
        type: String,
        required: true,
      },
      endAt: {
        type: String,
        required: true,
      },
    },
    inStock: {
      type: Number,
      required: [true, 'Please enter stock '],
    },
    isStock: {
      type: Boolean,
      required: [true, 'Please enter stock '],
    },
    reviews: [
      {
        user: {
          type: String,
          required: [true, 'Please give reviewer name'],
        },
        rating: {
          type: Number,
          required: [true, 'Please give ratings'],
        },
      },
    ],
    department: {
      type: String,
      required: [true, 'Please enter department   '],
    },

    semester: {
      type: String,
      required: [true, 'Please enter semester'],
    },
    courseCode: {
      type: String,
      required: [true, 'Please enter course code'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Book', bookSchema)
