const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { blogRouter } = require("./routes/blogRouter");

const app=express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/api",userRouter)
app.use("/api",blogRouter)

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to the DB");
        console.log("Server is running at port 8080");
    } catch (error) {
        console.log(error);
    }
})