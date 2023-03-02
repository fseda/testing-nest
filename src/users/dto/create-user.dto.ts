const Joi = require('joi');

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': `'name' should be a type of 'text'`,
      'string.empty': `'name' cannot be an empty field`,
      'string.min': `'name' should have a minimum length of {#limit}`,
      'string.max': `'name' should have a maximum length of {#limit}`,
      'any.required': `'name' is a required field`
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      'string.base': `'email' should be a type of 'text'`,
      'any.required': `'email' is a required field`
    }),
})

export interface CreateUserDto {
  name: string;
  email: string;
}