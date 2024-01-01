const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')

module.exports = {
  register: async (req, res) => {
    const {fullname, msv , password, major,k } = req.body
    const hashPassword = await Encrypt.cryptPassword(password)
    try {
      const validUser = await User.findOne({msv: msv})
      if(validUser) {
        res.status(400).json({message: 'User already exists'})
        return;
      }
      const newUser = new User({
        msv: msv,
        fullname: fullname,
        password: hashPassword,
        major: major,
        k: k,
        isAdmin: false
      })
      await newUser.save()
      res.status(200).json({message: 'Create account success'})
    } catch (err) {
      res.status(500).json({message: err})
    }
  }
}