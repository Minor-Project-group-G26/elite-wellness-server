const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')

const BooksSchema = require('./Packages/Books');
const EnrollSchema = require('./Packages/Enrollment');
const VerificationSchema = require('./Packages/Verification');


const UserSchema = new Schema({
    email:{
        type:String,
        unique: true,
        require: true,

    },
    password:{
        type:String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true,
        // default: 'gourav',
        min: 4,
        max: 50
    },
    username: {
        type: String,
        require: true,
        // default: 'gourav',
        min: 4,
        max: 50,
        unique: true
    },
    profile:{
        type: String,
        // unique: true,
        default: null,
        require: true
    },
    instructor:{
        type: Boolean,
        require: true,
        default: false

    },
    instructor_id:{
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'instructor'
    },
    dob:{
        type: String,
        require: true
    },
    occupation:{
        type: String,
        require: true,
        max: 255,
        default: "student"
    },
    enrollments:{
        in_progress:[EnrollSchema],
        completed: [EnrollSchema],
        overdue:[EnrollSchema] 
    },
    logs:[{type:String}],
    verification: {
        type:Boolean,
        require: true,
        default: false
    },
    verification_data:VerificationSchema,
    block_data:{
        type: Boolean,
        require: true,
        default: false

    },
    books:[BooksSchema],
    wishlist:{
        books:[BooksSchema],
        courses:[EnrollSchema]
    },
    phone:{
        type:String,
        default:""
        
    },
    admin:{
        type:Boolean,
        default: false,
        require:true
    }
},{
    timestamps: true
})


UserSchema.methods.hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10))
UserSchema.methods.comparePassword = (password, hash)=> bcrypt.compareSync(password, hash)
UserSchema.methods.createToken = (id, secretKey)=> jwt.sign({
    user_id: id,
    time: Date.now()
  }, secretKey);
UserSchema.methods.verifyToken = (token, secretKey)=> jwt.verify(token, secretKey, (err, data)=>{
    if(err) return {err: err};
    return {data: data};
});


module.exports = mongoose.model('users', UserSchema);