const mongoose = require('mongoose');
const PublisherSchema = require('./Packages/Publisher');
const BuyerSchema = require('./Packages/Buyer');
const Schema = mongoose.Schema



const BooksSchema = new Schema({
    author:[{type:String}],
    publisher:PublisherSchema,
    description: {
        type:String,
        require: true
    },
    title:{
        type: String,
        unique:true,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    category:{
        type:String,
        require: true
    },
    tags:[{type: String}],
    views:{
        type: Number,
        default: 0
    },
    no_sales: {
        type: Number,
        default: 0
    },
    buyers:[BuyerSchema],
    book_file:{
        type: String, 
        require: true
    },
    book_image:{
        type: String, 
        require: true
    }
},{
    timestamps:true
})


module.exports = mongoose.model('books', BooksSchema)


