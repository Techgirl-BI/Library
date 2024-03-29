import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(30).required(),
  phoneNumber: Joi.number(),
  address:Joi.string().required()
});