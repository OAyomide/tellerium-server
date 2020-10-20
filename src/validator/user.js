const validator = require('express-validation')
const Joi = require('joi')

module.exports = {
  create: validator({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
      name: Joi.string().max(100).required(),
    },
  }),
  validateLogin: validator({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}
