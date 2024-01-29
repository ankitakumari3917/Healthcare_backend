const express = require("express")
const mongoose =require("mongoose")
const Users = require("./src/Models/User")
const { register, login, findUser } = require("./src/Controlers/auths")
const cors = require("cors");
const server=express()

const { verifyToken } = require("./src/Middlewares")
server.use(express.json())




server.use(cors());


server.post("/register",register)
server.post("/login",login)
server.get("/get-user",verifyToken,findUser)
server.listen("4000",()=>{
  console.log("server started")
})
mongoose
  .connect(
    "mongodb+srv://roushan915520:Las2j8wgyuDgntTz@cluster0.5mlxslz.mongodb.net/hospital"
  )
  .then((data) => console.log("database is connected"))
  .catch((error) => console.log("Error"));