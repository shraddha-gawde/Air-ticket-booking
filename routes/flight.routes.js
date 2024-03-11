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

flightRouter.patch("/:id", auth, async(req, res)=>{
    const id = req.params.id
    const payload = req.body
    try{
        const flight = await flightModel.findByIdAndUpdate(id, payload)
        await flight.save()
        res.status(204).json({msg:"flight details has been updated", flight_data: payload})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

flightRouter.delete("/:id", auth, async(req, res)=>{
    const id = req.params.id
    try{
        const flight = await flightModel.findByIdAndDelete(id)

        res.status(202).json({msg:"flight has been deleted"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})
module.exports={
    flightRouter
}