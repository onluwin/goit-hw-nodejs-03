const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema, putSchema, patchSchema } = require("../../schemas");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router
  .get("/", ctrl.getAll)
  .post("/", validateBody(addSchema, `Missing required name fields`), ctrl.add);

router
  .get("/:contactId", isValidId, ctrl.getById)
  .put(
    "/:contactId",
    isValidId,
    validateBody(putSchema, "Missing fields"),
    ctrl.updateById
  )
  .delete("/:contactId", ctrl.remove);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(patchSchema, "Missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
