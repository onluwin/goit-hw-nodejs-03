const { ctrlWrapper, httpError } = require("../helpers");
const Contact = require("../models/contact");

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  console.log(owner);
  const contacts = await Contact.find({ owner }, "-createdAt, -updatedAt");
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-__v -owner");
  if (!result) {
    next();
  }
  res.json(result);
};

const add = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  console.log("result", result);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    next();
  }
  res.json({ message: "Contact deleted" }).status(204);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    },
    "-owner -__v"
  );
  if (!result) {
    return next();
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    },
    "-owner, -__v"
  );
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
