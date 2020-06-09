// const createError = require('http-errors');
// const express = require('express');
// const logger = require('morgan');

// const usersRouter = require('./routes/users');

// const app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// app.use('/users', usersRouter);

// app.use(function (req, res, next) {
//     next(createError(404));
// });

// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({message: err.message})
// });

// app.listen(8000);

// module.exports = app;
const express = require('express')
const path = require('path')

const app = express()

const env = process.env.NODE_ENV || 'development'
console.log('env', env)

app.use(express.static(path.join(__dirname, "..", "public")));

require('../api/startup/db')()
if(env === 'production') {
  require('../api/startup/redis')
}
require('../api/startup/logging')()
// require('./server/startup/template')(app)
require('../api/startup/routes')(app)
require('../api/startup/config')()
require('../api/startup/validation')()

// TODO improve winston with creating logger interface
// https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
const port = 8000
// app.listen(port, () => winston.info(`Listening on port ${port}...`))
app.listen(port, () => console.log(`Listening on port ${port}...`))
