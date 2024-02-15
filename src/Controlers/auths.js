const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../Helper/Email"); // Update the path accordingly
const User = require("../Models/User");
const Patient = require("../Models/Appointment");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.USER_PASS,
  },
});

async function sendWelcomeEmail(userEmail) {
  const mailOptions = {
    from: process.env.USER_GMAIL,
    to: userEmail,
    subject: "Welcome to Your App",
    text: "Thank you for registering with us!",
  };

  await transporter.sendMail(mailOptions);
}

exports.register = async (req, res) => {
  const { name, phone, email, password, gender, category } = req.body;
  console.log(`received:,${(name, phone, email, password, gender, category)}`);
  const _user = new User({ name, email, phone, password, gender, category });

  const eUser = await User.findOne({ email });

  if (!eUser) {
    try {
      // Save the new user to the database
      await _user.save();

      // Send a welcome email
      await sendWelcomeEmail(_user.email);

      return res.status(201).json({
        message: "User registered successfully",
        user: _user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to register user",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({
      message: "User already exists",
    });
  }
};

// exports.register = async (req, res) => {
//   const { name, phone, email, password, gender, category } = req.body;

//   const _user = new User({ name, email, phone, password, gender, category });

//   const eUser = await User.findOne({ email });
// console.log(_user)

//   if (!eUser) {
//     try {
//       // Save the new user to the database
//       await _user.save();

//       return res.status(201).json({
//         message: "User registered successfully",
//         user: _user

//       });

//     } catch (error) {
//       return res.status(500).json({
//         message: "Failed to register user",
//         error: error.message
//       });
//     }
//   } else {
//     return res.status(400).json({
//       message: "User already exists"
//     });
//   }
// };

exports.login = async (req, res) => {
  const { email, password, category } = req.body;

  const eUser = await User.findOne({ email });

  if (eUser) {
    if (eUser.authenticate(password)) {
      const token = jwt.sign(
        {
          id: eUser._id,
        },
        "MyAPPSECRET",
        { expiresIn: "24hr" }
      );
      return res.status(200).json({
        message: "You have logged in",
        token,
        isSuccess: true,
      });
    } else {
      return res.status(401).json({
        message: "your password or email is incorrect",
      });
    }
  } else {
    return res.status(404).json({
      message: "User Not found Please Signup",
    });
  }
};
exports.findUser = async (req, res) => {
  const user = await User.findById(req.id);
  return res.status(200).json({ user });
};

exports.appoint = async (req, res) => {
  try {
    const { name, phone, email, dob, time, category, address, problem } =
      req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !dob ||
      !time ||
      !category ||
      !address ||
      !problem
    ) {
      return res.status(400).json({ message: "All fields are required",status:0 });
    }

    // Create a new User instance
    const newPatient = new Patient({
      name,
      phone,
      email,
      dob,
      time,
      category,
      address,
      problem,
    });

    // Save the user to the database
    await newPatient.save();

    // Return success response
    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newPatient,
      status:1
    });
  } catch (error) {
    // Handle errors
    console.error("Error in booking appointment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
