const passport = require('passport')
const httpError = require('http-errors')
const { UNAUTHORIZED, FORBIDDEN } = require('http-status')
const User = require('../models/user')

const verifyJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info

  try {
    if (error || !user) {
      throw httpError(UNAUTHORIZED, error)
    }
    await req.logIn(user, { session: false })
  } catch (e) {
    return next(httpError(UNAUTHORIZED, error ? error.message : 'Unauthorized'))
  }

  if (!roles.includes(user.role)) {
    return next(httpError(FORBIDDEN, 'Forbidden'))
  }
  req.user = user
  return next()
}

const authorizeLogin = (roles = User.roles) => (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  verifyJWT(req, res, next, roles),
)(req, res, next)

module.exports = authorizeLogin
