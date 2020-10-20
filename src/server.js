const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')
const errorHandler = require('./middlewares/errors')

const apiRouter = require('./routes')
const passportJwt = require('./services/passport')

module.exports = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('dev'))

  app.use(passport.initialize())
  passport.use('jwt', passportJwt.jwt)

  app.use('/api', apiRouter)
  app.use(errorHandler.handleNotFound)
  app.use(errorHandler.handleError)

  const server = app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }
    console.log(`Server is running on ${config.port}`)
  })

  return server
}
