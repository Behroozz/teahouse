const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// subdoc method
// const { productSchema } = require('./product')

// subdocs method
// const categorySchema = new Schema({
//   categoryId: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 5,
//     maxlength: 50,
//   },
//   products: [productSchema]
// }, {
//   timestamps: true
// })

// population method
const categorySchema = new Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
}, {
  timestamps: true
})


// categorySchema.virtual('product_details', {
//   ref: 'product',
//   localField: 'productIds',
//   foreignField: 'id'
// })

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
  const schema = Joi.object({
    categoryId: Joi.number().required(),
    name: Joi.string().min(5).max(50).required(),
    productIds: Joi.array().items(Joi.string())
  })
  return schema.validate(category)
}

exports.Category = Category
exports.categorySchema = categorySchema
exports.validate = validateCategory