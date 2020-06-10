const _ = require('lodash')
const config = require('config')
const redis = require('../startup/redis')
const logger = require('../utilities/logger')

// TODO https://epsagon.com/blog/development/using-redis-to-optimize-mongodb-queries/
const cache = (req, res, next) => {
  let key = "teahouse" + req.originalUrl || req.url;
  if(_.get(req, 'method') === 'GET') {
    redis.get(key, (err, response) => {
      if(response) {
        logger.log('info', `cached response ${response}`)
        res.send(JSON.parse(response))
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          redis.set(key, JSON.stringify(body))
          logger.log('info', `cache the response ${body}`)
          res.sendResponse(body)
        }
        next()
      }
    })
  } else {
    redis.del(key,function (err, reply) {
      if(!err) {
        logger.log('info', `cache cleaned ${reply} for key ${key}`)
      } else {
        logger.log('info', `cache cleaned failed ${err} for key ${key}`)
      }
    })
    next()
  }
}

module.exports = cache