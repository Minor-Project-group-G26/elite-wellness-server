const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const EnrollSchema = new Schema({
    course_id:{
        type: Schema.Types.ObjectId,
        require:true,
        // unique: true
    },
    course_title:{
        type: String,
        require: true,
        // unique: true
    },
    weekly_status: {
        type: String,
        require: true
    },
    course_logs:[]
},{
    timestamps: true
})



module.exports = EnrollSchema