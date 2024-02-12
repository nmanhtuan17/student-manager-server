const jwt = require('jsonwebtoken')
const generateTokens = require('./generateTokens')
const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')
import Teacher from '../../Model/Teacher.model'

module.exports = {
  requestRefreshToken: (req, res) => {
    const { refreshToken } = req.body
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
    const { msv, password, mgv } = req.body;
    let user
    try {
      if (mgv) {
        user = await Teacher.findOne({ mgv: mgv.toUpperCase() })
        .populate({
          path: 'class.course'
        })
        .populate({
          path: 'class.students.student'
        })
      }
      else {
        user = await User.findOne({ msv: msv })
          .populate({
            path: 'semesters.semester'
          })
          .populate({
            path: 'semesters.courses.course'
          })
      }
      if (!user) {
        return res.status(404).json({ message: 'user not exist' });
      }
      const comparePassword = await Encrypt.comparePassword(password, user.password)
      if (comparePassword) {
        const accessToken = generateTokens.generateAccessToken(user)

        const refreshToken = generateTokens.generateRefreshToken(user)
        const { password, ...resUser } = user._doc;
        res.status(200).json({ data: { user: resUser }, tokens: { accessToken, refreshToken }})
      } else {
        res.status(400).json({ message: 'password is not correct' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  },

  changePassword: async (req, res) => {
    const { password } = req.body
    const hashPassword = await Encrypt.cryptPassword(password)
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(404).json({ message: "Unauthorized" })
        return;
      }
      user.password = hashPassword;
      await user.save();
      return res.status(200).json({ message: "Update success!!!" })
    } catch (e) {
      res.status(500).json({ message: 'server error' })
    }
  }
}