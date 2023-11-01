const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    userID: String,
    username: String,
    title:String,
    content:String,
    category:String,
    date:Date,
    likes:Number,
    comments:[]

},{
    versionKey:false
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports={
    BlogModel
}