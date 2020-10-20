const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const config = require('../config')
const User = require('../models/user')

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(err, null)
    }

    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
})

exports.jwtOptions = jwtOptions
exports.jwt = jwtStrategy
