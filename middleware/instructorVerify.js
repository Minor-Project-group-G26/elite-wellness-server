const User = require("../models/User");

exports.instructorAuth = (req, res , next)=>{
    console.log("====instructor====");
    console.log(req.headers);
    User.findById(req.headers._id, (err, user)=>{
        
        if(err)
        return res.send({error: err});
        console.log("=======");
        console.log(user);
        console.log("=======");
        if(!user.instructor){
            
            return res.send("User don't have Instructor access");
        }
        req.headers._instructor_id = user.instructor_id;
        console.log(user.instructor_id)
        next();
    });
    
}
