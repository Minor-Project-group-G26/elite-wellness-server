const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Course_InstructorSchema = new Schema({
   instructor_name:{
       type: String,
       require: true
   },
   instructor_id:{
       type:Object,
       require: true,
   },
   instructor_profession:{
    type: String,
    require: true
   }
})



module.exports = Course_InstructorSchema