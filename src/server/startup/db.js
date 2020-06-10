const config = require('config')
const mongoose = require('mongoose')
const logger = require('../utilities/logger')

const env = process.env.NODE_ENV || 'development'
let mongodb_url = config.get('mongodb.local_url')
if(env === 'production') {
  mongodb_url = config.get('mongodb.docker_url')
}

module.exports = function() {
  mongoose.connect(mongodb_url,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => logger.log('info', 'Connected to MongoDB...'))
  .catch(err => console.log(err))
}