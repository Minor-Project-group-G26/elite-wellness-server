const mongoose = require('mongoose');
const Course_DataSchema = require('./Packages/Courses_Data');
const Course_InstructorSchema = require('./Packages/Courses_Instructor');
const EnrollDetailsSchema = require('./Packages/EnrollmentDetails');
const FeedbackSchema = require('./Packages/Feedback');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    title:{
        type: String,
        require: true, 
        unique: true
    },
    draft:{
        type: Boolean, 
        require: true,
        default: true
    },
    instructor:Course_InstructorSchema,
    description: {
        type: String,
        max: 1024,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    level:{
        type: String,
        require: true
    },
    tags:[{
        type: String,
    }],
    category:{
        type:String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    duration:{
        no_of_weeks:{
            type: Number,
            require: true
        },
        time_per_week:{
            type: String,
            require: true
        }
    },
    data:[Course_DataSchema],
    enrollment_details: [EnrollDetailsSchema],
    feedback: [FeedbackSchema]

},{
    timestamps: true
})



module.exports = mongoose.model('courses', CoursesSchema)