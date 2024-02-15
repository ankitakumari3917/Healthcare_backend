const Appointment = require("../Models/Appointment");

exports.getAppointment = async (req, res) => {
  try {
    const email = req.query.email;
    const appointments = await Appointment.find({ email: email });
    return res.status(200).json({ message: "", appointments });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Error", error });
  }
};
