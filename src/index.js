const startup = require('./startup')
const mongoose = require('./services/mongoose')

const runServer = require('./server')

const handleServerExit = (server) => (exitSignal) => {
  server.close((err) => {
    console.log(err, `got '${exitSignal}', server exited`)
    process.exit(0)
  })
}

const validateEnvVariables = () => {
  const required = [
    'NODE_ENV',
    'PORT',
    'MONGOURI',
    'MONGOTESTURI',
    'JWT_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
  ]

  required.forEach((k) => {
    if (!process.env[k]) {
      throw new Error(`key ${k} not loaded in env`)
    }
  })
}

async function init() {
  validateEnvVariables()
  await mongoose.connect()
  await startup()
  const server = runServer()

  const handleExit = handleServerExit(server)

  process.on('SIGINT', handleExit)

  process.on('SIGTERM', handleExit)

  process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught exception')
    handleExit()
  })
}

init()
