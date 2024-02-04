const express = require("express")
const mongoose =require("mongoose")
const Users = require("./src/Models/User")
const { register, login, findUser } = require("./src/Controlers/auths")
const cors = require("cors");
const server=express()

const { verifyToken } = require("./src/Middlewares")
const { validateForm, isValidated } = require("./src/Middlewares/validation")
// const { addForm } = require("./src/Controlers/Form")
// const { sendEmail } = require("./src/Helper/Email")
server.use(express.json())
server.use(cors())



server.use(cors());

server.use(cors());

server.post("/register",validateForm,isValidated,register)
server.post("/login",login)
server.get("/get-user",verifyToken,findUser)
server.listen("6000",()=>{
  console.log("server started")
})
mongoose
  .connect(
    "mongodb://localhost:27017/Ankita"
  )
  .then((data) => console.log("database is connected"))
  .catch((error) => console.log(error));  