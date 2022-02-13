const Mongoose = require( "mongoose" );

const Schema = Mongoose.Schema;

const orderSchema = new Schema( {
    title: {
        type: String,
        required: true,

    },
    bookId: {
        type: String,
        required: true,
    },
    trxId: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,

    },
    imgUrl: {
        type: String,
        required: true,

    },
    quantity: {
        type: String,
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
        }
    }
}, {
    timestamps: true
} );
module.exports = Mongoose.model( 'Order', orderSchema );
