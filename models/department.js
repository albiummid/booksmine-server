const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const departmentSchema = new Schema( {
    name: {
        // Mathematics
        type: String,
        required: true,
    },
    departmentCode: {
        //Mathematics = MATH
        type: String,
        required: true,
    },
    semesters: [
        {
            title: {
                type: String,
                required: true,
            },
            semesterCode: {
                type: String,
                required: true,
            },
            courses: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    courseCode: {
                        type: String,
                        required: true,
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true,
} );

module.exports = mongoose.model( 'Department', departmentSchema );