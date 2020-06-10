const winston = require('winston')
const { createLogger, format } = winston

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'teahouse' },
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ]
})

module.exports = logger

