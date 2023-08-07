const mongoose = require("mongoose");
const { httpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  mongoose.isValidObjectId(contactId)
    ? next()
    : next(httpError(400, "ID is not valid!"));
};

module.exports = isValidId;
