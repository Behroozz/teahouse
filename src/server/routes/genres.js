const express = require('express')
const axios = require('axios')
const config = require('config')
const { Genre, validate } = require('../models/genre')
const logger = require('../utilities/logger')
const _ = require('lodash')

const env = process.env.NODE_ENV || 'development'
console.log('env', env)
let cache = (req, res, next) => { next() }
if(env === 'production') {
  cache = require('../middlewares/cache')
}

// https://expressjs.com/en/guide/routing.html
const router = express.Router()

// 400 bad request
// 401 unauthorized: client tried to operate on a protected resource without providing the proper authorization
// 403 forbidden: client’s request is formed correctly, but the REST API refuses to honor it, i.e. the user does 
// not have the necessary permissions for the resource
// 404 not found

router.get('/:id', cache, async (req, res) => {
  const key = req.params.id
  const genre = await Genre.findById(key);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
})

router.get('/', cache, async(req, res) => {
  logger.log('info', 'Getting list of all the genre')

  const genre = await Genre.find().sort('name')
  res.send(genre)
})

router.post('/', async (req, res) => {
  const { error } =  validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const genre = new Genre({ name: req.body.name })
  await genre.save()
  res.send(genre)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, function(err, result) {
    if(err) {
      res.send(err)
    } else {
      if(!result) {
        res.send(404).send('The genre with the given ID was not found.')
      } else {
        res.send(result)
      }
    }
  })
})

// Axios cheat sheet
// try{
//   const [request1, request2] = await axios.all or Promise.all([
//      axios.get(`endpoint 1`),
//      axios.get(`endpoint 2`)
//   ]);

//   const request3 = await axios.get(`endpoint 3`);
//   console.log(request3);
// }
// https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
router.get('/imdb/latest', async(req, res) => {
  try {
    const response = await axios.get(config.get('url.imdb.latest_genres'), {
      "headers":{
      "content-type":"application/json",
      "x-rapidapi-host": config.get('rapidapi.host'),
      "x-rapidapi-key": config.get('rapidapi.key'),
      "useQueryString":true
      },
      "params":{
        "tconst":"tt0944947"
      }
    })
    res.send(_.get(response, 'data'))
  } catch(ex) {
    console.log('ex', ex)
  }
})

module.exports = router