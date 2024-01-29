const User = require("../Models/User");
const jwt =require("jsonwebtoken")
exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  
  const _user = new User({ name, email, phone, password });

  const eUser = await User.findOne({ email });
  
  if (!eUser) {
    _user
      .save()
      .then((newUser) => {
        return res.status(201).json({message:"Account Created Successfully"});
      })
      .catch((error) => {
        return res.status(400).json({
          message: "Error occured",
          error,
        });
      });
  } else {
    return res.status(400).json({
      message: "user Already Exist",
    });
  }
 };
exports.login = async (req, res) => {
  const{email,password}=req.body;
 
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
