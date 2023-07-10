const User = require('../models/User')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.find({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered.')
    } else {
      const user = await User.create({ name, email, passwordDigest })
      res.send(user)
    }
  } catch (err) {
    throw err
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  CheckSession
}
