const mongoose = require('mongoose')
const User =require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(
        user =>{
            if(user.length>0){
                res.status(409).json({
                    message : "existing email"
                })
            }
            else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error : err
                        })
                    }
                    else{
                        const user = new User({
                            _id:new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                        })
                        user.save().then(
                            doc=>{
                                res.status(200).json({
                                    _id:doc._id,
                                    email:doc.email,
                                    password:doc.password
                                })
                            }
                        )
                    }
                })
            }
        }
    )
    .catch()}

exports.user_login=(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(
        user => {
            if(user.length<1){
                return res.status(401).json({
                    message : 'email not found'
                })
            }
            else{
                bcrypt.compare(req.body.password,user[0].password, (err,result)=>{
                    if(err){
                        return res.status(401).json({
                            message : 'Auth failed!'
                        })
                    }
                    if(result){
                        const token=jwt.sign({
                            email:user[0].email,
                            userId:user[0]._id
                        },"secret",{
                            expiresIn:"1h"
                        })
                        return res.status(200).json({
                            message : 'Auth successful',
                            token : token
                        })
                    }
                    res.status(401).json({
                        message : 'Auth failed!'
                    })
                })
            }
        }
    )
}

exports.user_delete=(req,res,next)=>{
    User.remove({_id:req.params.userId}).then(
        result => {
            res.status(200).json({
                message : "user deleted"
            })
        }
    )
}