import { Schema, model } from 'mongoose';
import { handleSaveError, addUpdateSettings } from './hooks.js';
import Joi from "joi";


export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(), 
  favorite: Joi.boolean(),
});
export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", addUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);


const Contact = model("contact", contactSchema)

export default Contact;