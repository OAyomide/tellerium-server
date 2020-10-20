const User = require('./models/user')

const checkRequiredAdmin = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

  const admin = await User
    .findOne({ email: ADMIN_EMAIL })
    .lean()

  if (admin) {
    return
  }
  console.log(`Admin user "${ADMIN_EMAIL}" does not exist, creating`)
  const user = new User({
    email: ADMIN_EMAIL,
    name: 'Admin',
    password: ADMIN_PASSWORD,
  })
  await user.save()
}

const init = async () => {
  console.log('Running startup scripts')

  await Promise.all([
    checkRequiredAdmin(),
  ])
}

module.exports = init
