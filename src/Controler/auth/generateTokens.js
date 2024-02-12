

const jwt = require('jsonwebtoken')
module.exports = {
  generateAccessToken: (user) => {
    return jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
      isGV: user.isGV
    },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '2h' }
    )
  },

  generateRefreshToken: (user) => {
    return jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
      isGV: user.isGV
    },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '365d' }
    )
  }
}
