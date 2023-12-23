import Contact, { addSchema, contactUpdateFavoriteSchema } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper }  from "../decorators/index.js";


const getAll = async (req, res) => {
 
  const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } 


const getById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.json(result);
}   
    
  
const addContact = async (req, res) => {
 
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
 
};

const deleteContact = async (req, res) => {
  
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true, runValidators: true}, );
       if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
 
}
const updateStatusById = async (req, res) => {
      const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true, runValidators: true}, );
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
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusById),
};
