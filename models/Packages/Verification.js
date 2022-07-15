const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const VerificationSchema = new Schema({
   document_type:{
        type: String,
        max:10
   },
   document_id:{
        type:String,
        require:true
   }
},{
    timestamps: true
})



module.exports = VerificationSchema