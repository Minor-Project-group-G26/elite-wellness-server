const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PublisherSchema = new Schema({
   publisher_name:{
       type: String,
       require: true
   },
   publisher_id:{
       type:Object,
       require: true,
   },
   publisher_profession:{
    type: String,
    require: true
   }
})



module.exports = PublisherSchema