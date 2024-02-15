const mongoose = require("mongoose");

const Patient = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Patientdata", Patient);
