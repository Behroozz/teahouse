const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50000,
  },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  img: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  color: {
    type: String,
    required: true,
    default: 'black'
  },
})

const Product = mongoose.model('Product', productSchema)

function validateProduct(product) {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50000).required(),
    price: Joi.number().min(0).required(),
    creator: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(5).max(50).required(),
    img: Joi.string(),
    category: Joi.string().min(5).max(50).required(),
    color: Joi.string().required(),
  })
  return schema.validate(product)
}

exports.Product = Product
exports.productSchema = productSchema
exports.validate = validateProduct