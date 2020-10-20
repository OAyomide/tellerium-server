const validator = require('express-validation')
const Joi = require('joi')

module.exports = {
  create: validator({
    body: {
      name: Joi.string().max(100).required(),
      coordinates: Joi.array().items(Joi.number().required()).min(2),
      category: Joi.string().max(100).required(),
      images: Joi.array().items(Joi.string().required()).min(3),
    },
  }),
}
