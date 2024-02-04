const {check,validationResult}= require("express-validator")
exports.validateForm=[
  check("name").notEmpty().withMessage("please enter name"),
  check("phone").isMobilePhone().withMessage("please enter phoneNumber"),
  check("email").isEmail().withMessage("please enter email"),
  // check("dob").notEmpty().withMessage("please enter dob"),
  check("gender").notEmpty().withMessage("please select gender"),
   check("category").notEmpty().withMessage("please select category"),
]
exports.isValidated=(req,res,next)=>{
const errors=validationResult(req)
if(errors.array().length> 0){
  return res.status(400).json({message:errors.array()[0].msg})

}
next()
}
