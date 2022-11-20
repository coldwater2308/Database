const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");


  if (token == undefined) {
    res.status(401).send("token is not available.");
  }

  try {
    
      jwt.verify(token, process.env.STUDENT_JWT_SECRET);
      next();

  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
