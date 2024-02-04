const User = require("../Models/User")
const jwt =require("jsonwebtoken")

exports.register = async (req, res, next) => {
  try {
    const { name, phone, email, password, category, gender } = req.body;

    const _user = new User({ name, email, phone, password, category, gender });

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      await _user.save();

      req.subject = "user form submitted";
      req.text = "your registration is completed";
      next();
    } else {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
  } catch (error) {
    // Handle any errors that occurred during the registration process
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// exports.register = async (req, res,next) => {
//   const { name, phone, email, password,category,gender } = req.body;
  
//   const _user = new User({ name, email, phone, password,category,gender });

//   const eUser = await User.findOne({ email });
  
//   if (!eUser) {
//     _user
//       .save()
//       req.subject="user form submitted"
//       req.text="your  registration is completed"
//       next();
      
//   } else {
//     return res.status(400).json({
//       message: "user Already Exist",
//     });
//   }
//  };
exports.login = async (req, res) => {
  const{email,password,category}=req.body;
 
  const eUser = await User.findOne({ email });
  
  if (eUser)
  {
   if(eUser.authenticate(password)){
    const token=jwt.sign({
      id:eUser._id
    },"MyAPPSECRET",{expiresIn:"24hr"})
    return res.status(200).json({
      message:"You have logged in",
      token,
      isSuccess:true
    })
   }
   else{
    return res.status(401).json({
      message:"your password or email is incorrect"
    })
   }
  }
else{
  return res.status(404).json({
    message:"User Not found Please Signup"
  })
}

};
exports.findUser = async (req,res)=>{
  const user = await User.findById(req.id)
  return res.status(200).json({user})
}
