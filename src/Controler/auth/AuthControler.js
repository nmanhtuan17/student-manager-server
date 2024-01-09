const jwt = require('jsonwebtoken')
const generateTokens = require('./generateTokens')
const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')

module.exports = {
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ message: "You're not authenticated" })
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      const newAccessToken = renerateTokens.generateAccessToken(user)
      const newRefreshToken = renerateTokens.generateRefreshToken(user)
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: "strict"
      })
      res.status(200).json({ accessToken: newAccessToken })
    })
  },

  login: async (req, res) => {
    const { msv, password } = req.body
    try {
      const user = await User.findOne({ msv: msv })
      if (!user) {
        return res.status(404).json({ message: 'user not exist' });
      }
      const comparePassword = await Encrypt.comparePassword(password, user.password)
      if (comparePassword) {
        const accessToken = generateTokens.generateAccessToken(user)

        const refreshToken = generateTokens.generateRefreshToken(user)
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: "strict"
        })

        const { password, ...resUser } = user._doc;
        res.status(200).json({ message: 'Login success', data: { user: resUser }, tokens: { accessToken } })
      } else {
        res.status(400).json({ message: 'password is not correct' })
      }
    } catch (error) {
      res.status(500).json({ message: 'server error', error: error })
    }
  }
}