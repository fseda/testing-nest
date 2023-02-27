const Joi = require('joi');

export const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required()
    .messages({
      'any.required': `"email" is a required field`
    }),
})

export interface CreateUserDto {
  name: string;
  email: string;
}