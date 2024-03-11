const express = require("express");
const { flightModel } = require("../models/flight.model")
const { auth } = require("../middlewares/auth.middleware")
require("dotenv").config()

const flightRouter = express.Router();

flightRouter.get("/flights",async(req, res)=>{
    try{
        const flights = await flightModel.find()
        res.status(200).json({msg:"this is all flight data", flight_data: flights})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

flightRouter.get("/:id",async(req, res)=>{
    try{
        const flightID = req.params.id
        const flight = await flightModel.findById(req.params.id)
        console.log(req.params.id)
        console.log(flight)
        if(!flight){
           return res.status(400).json({msg:"flight not exists"})
        }
        res.status(200).json({flight_data: flight})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

flightRouter.post("/create", auth, async(req, res)=>{
    const payload = req.body
    try{
        const flight = new flightModel(payload)
        await flight.save()
        res.status(201).json({msg:"new flight details added", flight_data: flight})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

flightRouter.put("/:id", auth, async(req, res)=>{
    const id = rwq.param
    const payload = req.body
    try{
        const flight = new flightModel(payload)
        await flight.save()
        res.status(201).json({msg:"new flight details added", flight_data: flight})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})
module.exports={
    flightRouter
}