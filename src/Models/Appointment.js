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
  dob:{
      type: String,
      required: true
    },
    gender:{
      type:String,
      enum: ['male', 'female','others'],
      required: true
    }
});
module.exports = mongoose.model("Patientdata", Patient);