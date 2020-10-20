const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const User = require('../models/user')
const config = require('../config')

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body)
    const newUser = await user.save()
    res.status(httpStatus.CREATED)
    res.json({ id: newUser.id })
  } catch (error) {
    return next(User.handleUserCreationError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findUser(req.body)
    delete user.password
    const token = jwt.sign(user, config.secret, { expiresIn: '5h' })
    return res.json({
      message: 'OK',
      token,
    })
  } catch (error) {
    next(error)
  }
}
