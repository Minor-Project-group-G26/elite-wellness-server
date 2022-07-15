const User = require("../models/User");

exports.auth = (req, res , next)=>{
    console.log(req.headers);
    const {token} = req.headers;
    if(!token) return res.send("no token available")
    const existUser = User();
    const {err, data} = existUser.verifyToken(token, "1234567890")
    console.log("error",err)
    console.log("token",data)
    
    if(err){
        return res.send({tokenErr:err})
    }
    req.headers._id = data.user_id
    next()
}
