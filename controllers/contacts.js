const { ctrlWrapper, httpError } = require("../helpers");
const Contact = require("../models/contact");

const getAll = async (_, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    next();
  }
  res.json(result);
};

const add = async (req, res) => {
  const newContact = req.body;
  const result = await Contact.create(newContact);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    next();
  }
  res.json({ message: "Contact deleted" }).status(204);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    return next();
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    return next();
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
