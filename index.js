const express = require("express")
const { connection } = require("./db")

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { userRouter } = require("./routes/user.routes")
const { flightRouter } = require("./routes/flight.routes")
const { bookingRouter } = require("./routes/booking.routes")
const app = express()

app.use(express.json())

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Air-ticket-Booking",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:4040",
        },
        {
          url: "https://air-ticket-booking-uxxg.onrender.com",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const openApiSpec = swaggerJSDoc(options);
  
  //Building complete UI
  app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get('/',(req,res)=>{
    res.json("this is home")
})
app.use("/users", userRouter)
app.use("/flights", flightRouter)
app.use("/bookings", bookingRouter)
app.listen(4040, async()=>{
    try{
        await connection
        console.log("server is connected")
    }catch(err){
        console.log(err)
    }
})