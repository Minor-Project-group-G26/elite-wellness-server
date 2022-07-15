const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const BuyerSchema = new Schema({
   Buyer_name:{
       type: String,
       require: true
   },
   Buyer_id:{
       type:Object,
       require: true,
   },
   transaction:{
    type: String,
    require: true
   }
},
{
    timestamps:true
}
)



module.exports = BuyerSchema