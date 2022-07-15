const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week_Data = new Schema({
    title:{
        type: String,
        require: true,
    }, 
    file:{
        type: String,
        require: true,
    },
    type:{
        type: String,
        require: true, 
    }
})

const User_Answare = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        require:true
    },
    answare:{
        type:String,
        require: true
    },
    score:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        require: true
    }
},{
    timestamps:true
})

const Assignment = new Schema({
    title:{
        type: String,
        require: true,

    },
    type_assignment:{
        type: String,
        require: true,
    },
    answare:{
    type: String,
    require: true,
    },
    week:{
        type: Number,
        require:true
    },
    question:{
    type: String,
    require: true,
    },
    user_ans:[User_Answare]
},{
    timestamps:true
})

const Reply = new Schema({
    
    name: {
        type: String,
        require: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        require: true
    },
    ans:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true,
        default: null
    },

}, {
    timestamps:true
})

const Discussion = new Schema({
    name: {
        type: String,
        require: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        require: true
    },
    query:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true,
        default: null
    },
    reply:[Reply]
    
},{
    timestamps:true
})

const Course_DataSchema = new Schema({
   week_topic:{
       type: String,
       require: true
   },
   week_no:{
       type:Number,
       require: true,
    //    unique: true
   },
   week_data:[Week_Data],
   assignment:[Assignment],
   discussion:[Discussion]
})



module.exports = Course_DataSchema