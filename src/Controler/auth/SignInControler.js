const User = require("../../Model/User.model")
const Encrypt = require('../../Utils/encryption')
const generateTokens = require('./renerateTokens')


module.exports = {
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
        res.status(200).json({ message: 'Login success', data: { user: resUser }, token: { accessToken } })
      } else {
        res.status(400).json({ message: 'Wrong password' })
      }
    } catch (error) {
      res.status(500).json({ message: 'server error', error: error })
    }
  }
}
