const express = require('express')

const router = express.Router()
const authController = require('../controllers/auth')
const {
  create,
  validateLogin,
} = require('../validator/user')
const {
  ADMIN,
} = require('../constants')

const auth = require('../middlewares/auth')

// only admin can create a new user
router.post('/register', [
  create,
  auth([ADMIN]),
], authController.register)

router.post('/login', validateLogin, authController.login)

module.exports = router
