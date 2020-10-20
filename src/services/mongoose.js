const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB, ${err}`)
  process.exit(1)
})

if (config.env === 'dev') {
  mongoose.set('debug', true)
}

exports.connect = async () => {
  // eslint-disable-next-line no-constant-condition
  const mongoURI = config.env === 'prod' || 'dev' ? config.mongo.uri : config.mongo.testURI

  await mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
  })

  mongoose.set('useCreateIndex', true)

  return mongoose.connection
}
