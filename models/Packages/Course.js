const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CourseSchema = new Schema({
   course_title:{
       type: String,
       require: true
   },
   course_id:{
       type:Object,
       require: true,
    //    unique: true
   }
})



module.exports = CourseSchema