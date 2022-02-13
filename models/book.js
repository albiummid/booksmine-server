const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const bookSchema = new Schema( {
    title: {
        type: String,
        required: [ true, 'Please enter book title' ],
        trim: true,
        maxLength: [ 50, 'Title cannot exceed 50 charecters' ]
    },
    author: {
        type: String,
        required: [ true, 'Please enter author name' ],
    },
    department: {
        type: String,
        required: [ true, 'Please enter department   ' ],
    },
    imgUrl: {
        type: String,
        required: [ true, 'Please give image URL  ' ],
    }
    ,
    semester: {
        type: String,
        required: [ true, 'Please enter semester' ],
    },
    courseCode: {
        type: String,
        required: [ true, 'Please enter course code' ],
    }
    ,
    ratings: {
        type: Number,
        required: false,
        default: 0,
    },
    price: {
        type: Number,
        required: [ true, 'Please enter price ' ],
    },
    discount: {
        type: Number,
        required: [ true, 'Please enter discount ' ],
    },
    inStock: {
        type: Boolean,
        required: [ true, 'Please enter stock ' ],
    },
    reviews: [
        {
            user: {
                type: String,
                required: [ true, 'Please give reviewer name' ]
            },
            rating: {
                type: Number,
                required: [ true, 'Please give ratings' ]
            }
        }

    ]

}, {
    timestamps: true
} )

module.exports = mongoose.model( 'Book', bookSchema );