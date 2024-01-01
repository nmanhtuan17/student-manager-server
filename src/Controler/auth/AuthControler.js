const jwt = require('jsonwebtoken')
const renerateTokens = require('./renerateTokens')
module.exports = {
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({message: "You're not authenticated"})
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if(err) {
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
      res.status(200).json({accessToken: newAccessToken})
    })
  }
}