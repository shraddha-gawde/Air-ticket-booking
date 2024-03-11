const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { userModel } = require("../models/user.models")
require("dotenv").config()
const userRouter = express.Router();


userRouter.post("/register", async(req, res)=>{
    const {name, email, password} = req.body

    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({msg: " user already exists"})
        }

        bcrypt.hash(password, 5, async(error, hash)=>{
            const user = new userModel({name, email, password:hash})
            await user.save()
            res.status(201).json({msg:"new user has been registed", registedUser : user})
        })
    }
    catch(err){
        res.status(400).json({msg:"error occured while registed", error: err})
    }
})


userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (error, pass)=>{
                if(error){
                    res.status(400).json({msg:"User does not exists"})
                }
                if(pass){
                    const secrete_key = process.env.secrete_key;
                    const token = jwt.sign({userID: user._id}, secrete_key, {expiresIn : "7d"})
                    res.status(201).json({msg:"Login successfull!!!", loginUser : user.name, token})
                }
            })
        }
        else{
            res.status(400).json({msg:"User does not exists"})
        }
    }
    catch(err){
        res.status(400).json({msg:"User does not exists"})
    }
})
module.exports={
    userRouter
}