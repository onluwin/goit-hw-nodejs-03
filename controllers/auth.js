const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ctrlWrapper, httpError } = require("../helpers");
const { hashPassword, comparePassword } = require("../helpers/password");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "Email already in use" });
  }
  const newUser = await User.create({
    ...req.body,
    password: await hashPassword(password),
  });
  res.status(201).json({ user: { email, role: newUser.role } });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const result = await comparePassword(password, user.password);

  if (!result) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.secretKey, {
    expiresIn: "23h",
  });
  await User.findByIdAndUpdate(user.id, { token });
  res.json({ token, user: { email, role: user.role } });
};

const current = async (req, res) => {
  const { email, role } = req.user;

  res.json({ email, role });
};

const logoutUser = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).send("Logout success");
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  current: ctrlWrapper(current),
};
