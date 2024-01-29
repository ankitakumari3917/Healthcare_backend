const express = require("express")
const mongoose =require("mongoose")
const Users = require("./src/Models/User")
const { register, login, findUser } = require("./src/Controlers/auths")
const server=express()
const cors =require("cors")
const { verifyToken } = require("./src/Middlewares")
server.use(express.json())
server.use(cors())



server.post("/register",register)
server.post("/login",login)
server.get("/get-user",verifyToken,findUser)
server.listen("6000",()=>{
  console.log("server started")
})
mongoose.connect("mongodb://localhost:27017/hospital")
.then(data=>console.log("database is connected"))
.catch(error=>console.log("Error"))