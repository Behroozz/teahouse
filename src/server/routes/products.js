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


// GET /task?completed=false
// req.query.completed
// price: { $gt: 17, $lt: 66 },
// category: { $in: ['hardcover', 'art'] }
// select('name price').
// GET /task?limit=10&skip=20
// GET /task?sort=createdAt_asc // desc
router.get('/', cache, async (req, res) => {
  const sort = {}

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const products = await Product
      .find({ })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort)
    res.send(products)
  } catch(ex) { 
    console.log('ex', ex)
  }
})

router.get('/:id', cache, async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({ id: id })
    if(!product) {
      return res.status(404).send()
    }
    res.send(product)
  } catch(ex) {
    res.status(500).send('The product with given ID was not found.')
  }
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
  res.status(201).send(product)
})

module.exports =  router