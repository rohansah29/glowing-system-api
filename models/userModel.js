const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}