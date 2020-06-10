const express = require('express')
const path = require('path')

const app = express()

const env = process.env.NODE_ENV || 'development'
console.log('Behrooz env', env)

app.use(express.static(path.join(__dirname, "..", "public")));

require('../server/startup/db')()
if(env === 'production') {
  require('../server/startup/redis')
}
require('../server/startup/logging')()
require('../server/startup/routes')(app)
require('../server/startup/config')()
require('../server/startup/validation')()

// TODO improve winston with creating logger interface
// https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
const port = 8000
// app.listen(port, () => winston.info(`Listening on port ${port}...`))
app.listen(port, () => console.log(`Listening on port ${port}...`))
