// https://hapi.dev/module/joi/
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Genre = mongoose.model('Genre', genreSchema)

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  })
  return schema.validate(genre)
}

exports.Genre = Genre
exports.genreSchema = genreSchema
exports.validate = validateGenre