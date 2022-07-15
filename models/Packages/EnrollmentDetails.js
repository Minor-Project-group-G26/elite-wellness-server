const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const EnrollDetailsSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        require:true,
        // unique: true
    },
    status: {
        type: String,
        require: true,
        default:'on_progress'
    },
    percentage:{
        type: Number,
        require: true,
        default: 0
    },
    transaction:{
        type: String,
        require:true
    }
},{
    timestamps: true
})



module.exports = EnrollDetailsSchema