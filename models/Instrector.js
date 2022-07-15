const mongoose = require('mongoose');
const BooksSchema = require('./Packages/Books');
const CourseSchema = require('./Packages/Course');
const VerificationSchema = require('./Packages/Verification');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        require: true, 
        unique: true,
        ref: 'users'
    },
    courses:[CourseSchema],
    books: [BooksSchema],
    verification: {
        type: Boolean,
        default: false
    },
    verification_data:VerificationSchema,
    block:{
        type: Boolean,
        default: false
    },
    block_msg:{
        type: String,
    }
},{
    timestamps: true
})



module.exports = mongoose.model('instructors', InstructorSchema)