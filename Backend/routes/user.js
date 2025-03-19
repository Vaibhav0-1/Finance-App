const express = require("express");
const router = express.router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config.js");
const UserSchema = require("../schema/user.js");



app.post("/signup", async(req,res)=>{

    const body = req.body;

    const {parsedBody} = UserSchema.safeParse(req.body);

    if(!parsedBody){
       return res.status(400).send("Email already taken / Incorrect inputs");
    }

    const user = User.findOne({username: req.body.username});
    if(user._id ){
        return res.json({
          message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    
    const token = jwt.sign({
      userId : dbUser._id,

    }, JWT_SECRET, {expiresIn: "1h"});
    res.json({
        message: "User created successfully",
        token: token
    })
})

app.post("signin", (req,res)=>{
    const body = req.body;

    

})


app.post("signup", (req,res)=>{

})

module.exports = router;
