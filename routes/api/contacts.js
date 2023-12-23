import express from "express";
// import contacts from "../../models/contacts.js";
import contactsController from "../../controllers/contacts-controller.js";

const router = express.Router();


router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getById);

// router.post("/", contactsController.addContact);

// router.delete("/:contactId", contactsController.deleteContact);

// router.put("/:contactId", contactsController.updateById);

export default router;
