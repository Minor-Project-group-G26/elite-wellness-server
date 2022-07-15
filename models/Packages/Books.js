const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const BooksSchema = new Schema({
   book_title:{
       type: String,
       require: true
   },
   book_id:{
       type:Object,
       require: true,
    //    unique: true
   }
},{
    timestamps: true
})



module.exports = BooksSchema