const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const { register, login, findUser, appoint } = require("./src/Controlers/auths");
const cors = require("cors");
const server = express();

const { verifyToken } = require("./src/Middlewares");
const { validateForm, isValidated } = require("./src/Middlewares/validation");

server.use(express.json());
server.use(cors());

server.use(cors());

server.post("/register",validateForm,isValidated,register)
server.post("/login",login)
server.post("/appoint",appoint)
server.get("/get-user",verifyToken,findUser)
server.listen("3000",()=>{
  console.log("server started")
})
mongoose
  .connect("mongodb://localhost:27017/test")
  .then((data) => console.log("database is connected"))
  .catch((error) => console.log(error));
