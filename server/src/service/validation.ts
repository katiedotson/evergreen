import Joi from "joi";
import { User } from "../types";

export const validateUser = (user: User): any => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(40).required(),
    lastName: Joi.string().min(4).max(40).required(),
    email: Joi.string().email(),
    userId: Joi.string().required(),
    platform: Joi.string().required(),
    interests: Joi.array(),
    location: Joi.string(),
    bio: Joi.string(),
    joinDate: Joi.date(),
    occupation: Joi.string(),
    img: Joi.string(),
  });

  if (schema.validate(user)) {
    return null;
  } else return schema.validate(user).error.details[0].message;
};
