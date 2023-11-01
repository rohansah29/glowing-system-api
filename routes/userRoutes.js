const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

const userRouter=express.Router()

//registration route
userRouter.post("/register",async(req,res)=>{
    const {username,avatar,email,password}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.send({"error":err})
            }else{
                const user=new UserModel({username,avatar,email,password:hash})
                await user.save()
                res.send({"msg":"New user has been registered"})
            }
        }); 
    } catch (error) {
        res.send({"error":error})
    }
})

//login route
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token=jwt.sign({userID:user._id,username:user.username},"masai")
                    res.send({"msg":"Logged In!","token":token})
                }else{
                    res.send({"error":err})
                }
            });
        }else{
            res.send({"msg":"User does not exist!"})
        }
    } catch (error) {
        res.send({"error":error})
    }
})

// userRouter.get("/logout",auth,async(req,res)=>{
//     const token=req.headers.authorization?.split(" ")[1]
//     try {
//         if(token){
//             await BlacklistModel.create({token})
//             res.status(200).send({msg:"User has been logged out"});
//         }else{
//             res.status(400).send({error:error}); 
//         }
//     } catch (error) {
//         res.status(400).send({error:error});
//     }
// })

module.exports={
    userRouter
}