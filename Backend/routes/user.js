const express = require("express");
const router = express.router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config.js");
const z = require("zod");
const {middleware} = require("../middleware.js");
const authMidddleware = require("../middleware.js");


const UserSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  Firstname: z.string(),
  Lastname: z.string()
})

router.post("/signup", async(req,res)=>{

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

const UserSchemaSignin = z.object({
  username: z.string().email(),
  password: z.string().min(8)
}) 

router.post("/signin", async(req,res)=>{

    const {parsedBody} = UserSchemaSignin.safeParse(req.body);

    if(!parsedBody){
      return res.status(400).send("Incorrect inputs");
   }

   const user = await User.findOne({username: req.body.username, password: req.body.password});

   if(user){
   const token = jwt.sign({
    userId : dbUser._id,

  }, JWT_SECRET);
  res.json({
      token: token
  })
  return;
   }
   
})

const updateBody = z.object({
  password: Zod.string().optional(),
  FirstName: Zod.string().optional(),
  Lastname: Zod.string().optional(),

})

router.put("/", authMidddleware, async(req,res)=>{
  const {parsedBody} = UserSchema.safeParse(req.body);

  if(!parsedBody){
     return res.status(400).send("Email already taken / Incorrect inputs");
  }

  await User.updateOne(req.body, {
    id: req.userId
  })

  res.json({
    message: "Updated Successfully"
  })
})










module.exports = router;
