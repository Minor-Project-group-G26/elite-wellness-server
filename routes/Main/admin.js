const express = require('express');
const Instrector = require('../../models/Instrector');
const User = require('../../models/User');
const Router = express.Router();

Router.put('/verify/instructor', async(req, res, next)=>{
    const result = await Instrector.findByIdAndUpdate(req.body.instructor_id,{$set:{verification: req.body.status}})
    if(!result)
    return res.json({status:'failed', msg:'Failed to update data Please Try Again'})
    return res.json({status:'success', msg:'Successfully Updated'})
})
Router.put('/verify/user', async(req, res, next)=>{
    const result = await User.findByIdAndUpdate(req.body.user_id,{$set:{verification: req.body.status}})
    if(!result)
    return res.json({status:'failed', msg:'Failed to update data Please Try Again'})
    return res.json({status:'success', msg:'Successfully Updated'})
})





module.exports = Router