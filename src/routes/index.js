const express = require('express')

const router = express.Router()
const authRouter = require('./auth')
const marketRouter = require('./market')

router.use('/auth', authRouter)
router.use('/market', marketRouter)

module.exports = router
