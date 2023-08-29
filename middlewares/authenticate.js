const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, process.env.secretKey);
    if (!id) {
      next(httpError(401));
    }

    const user = await User.findById(id);

    if (!user || !user.token || token !== user.token) {
      next(httpError(401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(httpError(401));
  }
};

module.exports = authenticate;
