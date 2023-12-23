import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isValidId from "../../middlewares/isValidId.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from '../../decorators/validateBody.js';

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId",isValidId, contactsController.getById);

router.post("/", isValidId, isEmptyBody, contactsController.addContact);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put("/:contactId", isValidId, isEmptyBody, contactsController.updateById);

router.patch("/:id/favorite", isValidId, isEmptyBody, contactsController.updateStatusContact)

export default router; 
