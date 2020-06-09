const express = require('express')
const _ = require('lodash')
const router = express.Router()
const { Product, validate } = require('../models/product')
// const { Genre } = require('../models/product')
const sample = require('../mock/sample-product.json')

const env = process.env.NODE_ENV || 'development'
let cache = (req, res, next) => { next() }
if(env === 'production') {
  cache = require('../middlewares/cache')
}

router.post('/populate', async (req, res) => {
  const mock_data = _.get(sample, "products")
  try {
    const result = await Product.insertMany(mock_data)
    res.status(200).json({'success': 'new documents added!', 'data': result});
  } catch(ex) {
    res.status(400).json({ex});
  }
})

router.get('/', cache, async (req, res) => {
  const products = await Product.find().sort('category')
  res.send(products)
})

router.post('/', cache, async (req, res) => {
  const { error } = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  
  const product = new Product({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    type: req.body.type,
    img: req.body.img,
    category: req.body.category,
    color: req.body.color,
    price: req.body.price
  })

  await product.save()
  res.send(product)
})

module.exports =  router