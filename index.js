const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { flightRouter } = require("./routes/flight.routes")
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json("this is home")
})
app.use("/users", userRouter)
app.use("/flights", flightRouter)
app.listen(4040, async()=>{
    try{
        await connection
        console.log("server is connected")
    }catch(err){
        console.log(err)
    }
})