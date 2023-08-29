const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema, putSchema, patchSchema } = require("../../schemas");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router
  .get("/", authenticate, ctrl.getAll)
  .post(
    "/",
    authenticate,
    validateBody(addSchema, `Missing required name fields`),
    ctrl.add
  );

router
  .get("/:contactId", authenticate, isValidId, ctrl.getById)
  .put(
    "/:contactId",
    authenticate,
    isValidId,
    validateBody(putSchema, "Missing fields"),
    ctrl.updateById
  )
  .delete("/:contactId", authenticate, ctrl.remove);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(patchSchema, "Missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
