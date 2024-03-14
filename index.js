const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const {
  register,
  login,
  findUser,
  appoint,
} = require("./src/Controlers/auths");
const cors = require("cors");
const server = express();

const { verifyToken } = require("./src/Middlewares");
const { validateForm, isValidated } = require("./src/Middlewares/validation");
const { getAppointment } = require("./src/Controlers/Appointments");

server.use(express.json());
server.use(cors());

server.use(cors());

server.post("/register", validateForm, isValidated, register);
server.post("/login", login);
server.post("/appoint", appoint);
server.get("/get-user", verifyToken, findUser);
server.get("/get-appointments", getAppointment);
server.listen("3000", () => {
  console.log("server started");
});
mongoose
  .connect("mongodb://ankitakumari3917:1KFPpmwmimmqJ0rb@ac-h5amn6j-shard-00-00.xxh1c5c.mongodb.net:27017,ac-h5amn6j-shard-00-01.xxh1c5c.mongodb.net:27017,ac-h5amn6j-shard-00-02.xxh1c5c.mongodb.net:27017/?ssl=true&replicaSet=atlas-rsrl2c-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
  .then((data) => console.log("database is connected"))
  .catch((error) => console.log(error));
