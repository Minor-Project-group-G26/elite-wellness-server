const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const FeedbackSchema = new Schema({
   user_id:{
       type: Schema.Types.ObjectId,
       require: true
   },
   user_name:{
       type:String,
       require:true
   }, 
   text:{
       type: String,
       max: 255,
       require:true
   },
   stars:{
       type: Number, 
       max:5,
       min: 1,
       require: true 
   }
})



module.exports = FeedbackSchema