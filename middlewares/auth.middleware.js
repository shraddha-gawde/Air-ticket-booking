const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = async(req, res, next)=>{
    const access_token = req.headers.authorization?.split(" ")[1]
    if(access_token){
        try{
            const decode = jwt.verify(access_token, process.env.secrete_key)

            if(decode){
                req.body.userID = decode.userID
                
                next();
            }else{
                res.json({msg:"you are not authorized"})
            }
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        res.json({msg:"please login"})
    }
}

module.exports={
    auth
}