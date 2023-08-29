const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

module.exports = { hashPassword, comparePassword };
