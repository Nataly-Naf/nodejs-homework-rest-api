import contacts from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import Joi from "joi";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});


const getAll = async (req, res) => {
 
    const result = await contacts.listContacts();
    res.json(result);
  } 


const getById = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not Found")
    }
    res.json(result);
}   
    
  

const addContact = async (req, res) => {
 
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
 
};

const deleteContact = async (req, res) => {
  
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
 
};

const updateById = async (req, res) => {
 
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
       if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
 
}

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
  updateById: ctrlWrapper(updateById)
};
