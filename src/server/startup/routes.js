const express = require('express')
const compression = require('compression')

const products = require('../routes/products')
const categories = require('../routes/categories')

module.exports = function(app) {
  app.use(express.json())
  app.use(compression())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/products', products)
  app.use('/api/categories', categories)
}