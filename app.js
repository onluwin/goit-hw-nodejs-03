const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (!err.status) {
    res.json({ message: "Server error" });
  }
  res.status(err.status).json({ message: err.message });
});

module.exports = app;

// http://localhost:3001/api/v1/contacts
// http://localhost:3001/api/v1/users

// mongoDB username nikitagurzhiy1 password AUrfvjBE0y0hnZbK
