const Router = require('express').Router()
const User = require('../../models/User')




Router.post('/sign_up', async(req, res, next)=>{
    const {email, password, name, username, date_of_birth} = req.body;
    console.log(req.body)

    await User.findOne({email: email}, (err, user)=>{
        console.log("user", user)
        console.log("error", err)
        if(err) {res.status(500).send(err)}
        else{ 
            if(user)
            res.status(500).send('User already exists.');
            else{
                    
                const newUser = new User();
                newUser.email = email;
                newUser.name = name;
                newUser.username = username;
                newUser.password = newUser.hashPassword(password);
                newUser.dob = date_of_birth;
                // newUser.occupation = occupation;
                newUser.save((err, user)=>{
                    console.log(user)
                    if(err)
                    res.status(500).json({err: err,status:"failed"});
                    else
                    res.send({token:newUser.createToken(newUser._id, "1234567890"), username:newUser.username, status:"success" })
                    
                })
                
            }
        }
    }) 
});

Router.post('/sign_in', async(req, res, next)=>{
    const {email, password} = req.body;

    await User.findOne({email: email}, (err, user)=>{
        // res.send(err)
        if(err)  return res.status(401).send({error:err, status:"failed"});
         
        if (user == null) {
            return res.status(401).send({error: "no user found", status:"failed"});
        }
        //    res.json(err);
        let existUser = User(user);
        if(existUser.comparePassword(password,existUser.password))
            res.send({token:existUser.createToken(existUser._id, "1234567890"), username:existUser.username, status:"success" })
        else
            res.status(401).send({error:"wrong Email/Password", status:"failed"})
        
    }) 
});






module.exports = Router