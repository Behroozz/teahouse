const express = require('express')
const _ = require('lodash')
const router = express.Router()
const { Category, validate } = require('../models/category')
const { Product, validate : productValidate } = require('../models/product')

const env = process.env.NODE_ENV || 'development'
let cache = (req, res, next) => { next() }
if(env === 'production') {
  cache = require('../middlewares/cache')
}

/**
 * Get categories
 * */
router.get('/', cache, async (req, res) => {
  const categories = await Category.find().sort('category')
  res.send(categories)
})

/**
 * Population method
 * Get category by Id and populate the products
 * And filter base product category
 * */
router.get('/:categoryId', cache, async (req, res) => {
  const categoryId = req.params.categoryId
  const match = {}
  const categoryQuery = req.query.category
  if(categoryQuery) {
    match.category = categoryQuery
  }

  try {
    const category = await Category
      .findOne({ categoryId: categoryId })
      .populate({
        path: 'products',
        match
      })
    res.send(category)
  } catch(ex) {
    console.log('ex', ex)
    res.status(500).send('The category with given ID was not found.')
  }
})

/**
 * Add product to category
 */
router.post('/:categoryId', cache, async (req, res) => {
  const categoryId = req.params.categoryId
  console.log('categoryId', categoryId)
  const { error } = productValidate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  try {
    const category = await Category.findOne({ categoryId: categoryId })
    console.log('category', category)
    if(!category) {
      return res.status(404).send()
    }

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
    category.products.push(product)
    await category.save()
    res.status(201).send(product)
  } catch(ex) {
    console.log('ex', ex)
  }
})

/**
 * suboc method
 * Get category by Id
 * */
// router.get('/:categoryId', cache, async (req, res) => {
//   const categoryId = req.params.categoryId
//   try {
//     const category = await Category.findOne({ categoryId: categoryId })
//     if(!category) {
//       return res.status(404).send()
//     }
//     res.send(category)
//   } catch(ex) {
//     res.status(500).send('The category with given ID was not found.')
//   }
// })

/**
 * suboc method
 * Create category with product
 * */
// router.post('/', cache, async (req, res) => {
//   const { error } = validate(req.body)
//   if(error) return res.status(400).send(error.details[0].message)
  
//   // use sub docs to nest data /NoSql way/
//   const category = new Category({
//     categoryId: req.body.categoryId,
//     name: req.body.name,
//   })

//   category.products.push({ 
//     id: 11,
//     title: "Nice Book",
//     description: "long days",
//     price: 18.00,
//     creator: "Melissa Hartwig",
//     type: "hardcover",
//     img: "https://images-na.ssl-images-amazon.com/images/I/61WFjEDBktL._SX437_BO1,204,203,200_.jpg",
//     category: "bussiness",
//     color: "yellow"
//   })

//   await category.save()
//   res.status(201).send(category)
// })

module.exports =  router