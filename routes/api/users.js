const express = require("express");
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemas/usersSchema");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router
  .post(
    "/register",
    validateBody(registerSchema, "Missing fields"),
    ctrl.registerUser
  )
  .post("/login", validateBody(loginSchema, "Missing fields"), ctrl.loginUser)
  .post("/logout", authenticate, ctrl.logoutUser)
  .post("/current", authenticate, ctrl.current);

module.exports = router;
