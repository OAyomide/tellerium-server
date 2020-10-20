require('dotenv').config() // load .env file

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  secret: process.env.JWT_SECRET,
  mongo: {
    uri: process.env.MONGOURI,
    testURI: process.env.MONGOTESTURI,
  },
}
