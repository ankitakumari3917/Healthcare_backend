const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
      const data = jwt.verify(token, "MyAPPSECRET");
      const { id } = data;
      console.log(id);
      req.id = id;
      next();
    } else {
      return res.status(401).json({
        message: "Token is missing",
      });
    }
  } catch (err) {
    return res.status(401).json({ err });
  }
};
