const express = require("express");
const { bookingModel } = require("../models/booking.models")

const { auth } = require("../middlewares/auth.middleware");
const { flightModel } = require("../models/flight.model");
require("dotenv").config()

const bookingRouter = express.Router();

bookingRouter.post("/", auth, async(req,res)=>{

    try{
        const {id} = req.body
        const booking = new bookingModel({user: req.body.userID, flight: id})
        
        await booking.save();
        res.status(201).json({msg:"flight has been booked by user"})
        
    }catch(err){
        res.status(400).json({error: err})
    }
})


bookingRouter.get("/dashboard",auth, async(req, res)=>{
    try{
        const bookings = await bookingModel.find({user: req.body.userID}).populate('user flight')
        res.status(200).json({msg:"all booking made by this user", bookings : bookings})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

bookingRouter.patch("/update/:id", auth, async(req, res)=>{
   
    // const payload = req.body
    // console.log(id)
    try{
        const {flight} = req.body
        const id = req.params.id
        const booking = await bookingModel.findByIdAndUpdate(id, {user: req.body.userID, flight: flight})
        await booking.save()
        if(booking){
            res.status(204).json({msg:"booking details has been updated", booking_data: booking})
        }
        
    }
    catch(err){
        res.status(400).json({error: err})
        console.log(err)
    }
})

bookingRouter.delete("/:id", auth, async(req, res)=>{
    const id = req.params.id
    try{
        const booking = await bookingModel.findByIdAndDelete(id)

        res.status(202).json({msg:"booking has been deleted"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

module.exports={
    bookingRouter
}