const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const httpError = require('http-errors')

const {
  BASIC_USER,
  ADMIN,
} = require('../constants')

const roles = [BASIC_USER, ADMIN]

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  name: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: String,
    default: 'basic',
    enum: roles,
  },
}, {
  timestamps: true,
})

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    this.password = bcrypt.hashSync(this.password)
    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.method({
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password)
  },
})

userSchema.statics = {
  roles,
  handleUserCreationError(err) {
    if (err.code === 11000) {
      const error = new Error('Email already taken')
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already taken'],
      }]
      error.status = httpStatus.CONFLICT
      return error
    }
    return err
  },

  /**
   * @param {{
   *  email: string,
   *  password: string
   * }} payload
   *
   * @returns{object}: user object
   */
  async findUser(payload) {
    const {
      email,
      password,
    } = payload

    if (!email) {
      throw new Error('Invalid user email')
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw httpError(httpStatus.NOT_FOUND, 'Invalid credentials')
    }

    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      throw httpError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
    }
    // eslint-disable-next-line no-underscore-dangle
    return user._doc
  },
}

module.exports = model('User', userSchema)
