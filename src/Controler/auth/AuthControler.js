const jwt = require('jsonwebtoken')
const generateTokens = require('./generateTokens')
const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')

module.exports = {
  requestRefreshToken: (req, res) => {
    const {refreshToken} = req.body
    console.log("refreshToken", refreshToken)
    if (!refreshToken) return res.status(403).json({ message: "Token invalid" })
    try {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log(err)
          return res.status(403).json({ message: "You're not authenticated" })
        }
        const newAccessToken = generateTokens.generateAccessToken(user)
        const newRefreshToken = generateTokens.generateRefreshToken(user)
        res.status(200).json({ tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken } })
      })
    } catch (e) {
      res.status(500).json("server error")
    }

  },

  login: async (req, res) => {
    const { msv, password } = req.body
    try {
      const user = await User.findOne({ msv: msv })
        .populate({
          path: 'semesters.semester',
          populate: { path: 'courses.course' }
        })
      if (!user) {
        return res.status(404).json({ message: 'user not exist' });
      }
      const comparePassword = await Encrypt.comparePassword(password, user.password)
      if (comparePassword) {
        const accessToken = generateTokens.generateAccessToken(user)

        const refreshToken = generateTokens.generateRefreshToken(user)
        const { password, ...resUser } = user._doc;
        res.status(200).json({ data: { user: resUser }, tokens: { accessToken, refreshToken } })
      } else {
        res.status(400).json({ message: 'password is not correct' })
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' })
    }
  }
}