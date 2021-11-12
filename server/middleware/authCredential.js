// import jwt
const jwt = require("jsonwebtoken");

// create authorisation function
const authCredential = (req, res, next) => {
  // get token from header of request
  const token = req.header("x-access-token");

  // if token is not present deny authorisation
  if (!token) {
    return res
      .status(406)
      .json({ error: "No Authentication Token, Authorisation Denied" });
  }

  // verify token if present by importing
  // JWT secret from .env file
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  // if verification fails deny authorisation
  if (!verified) {
    return res
      .status(406)
      .json({ error: "Token verification failed, Authorisation Denied" });
  }
  // if successful go to next function in router
  next();
};

// export module
module.exports = authCredential;
