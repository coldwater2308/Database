const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const B2Ctoken = req.header("x-auth-token");
  const B2Btoken = req.header("Authorization");

  if (B2Ctoken == undefined && B2Btoken == undefined) {
    res.status(401).send("token is not available.");
  }

  try {
    if (B2Ctoken) {
      jwt.verify(B2Ctoken, process.env.B2C_JWT_SECRET);
      next();
    } else if (B2Btoken) {
      jwt.verify(B2Btoken, process.env.B2B_JWT_SECRET);
      next();
    }
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
