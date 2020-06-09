const express = require('express')
const compression = require('compression')

// const genres = require('../routes/genres')
const products = require('../routes/products')

module.exports = function(app) {
  app.use(express.json())
  app.use(compression())
  app.use(express.urlencoded({ extended: true }))
  // app.use('/api/genres', genres)
  app.use('/api/products', products)
}