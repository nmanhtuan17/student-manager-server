const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')

module.exports = {
  register: async (req, res) => {
    const {fullname, msv , password, major,k } = req.body
    const hashPassword = await Encrypt.cryptPassword(password)
    try {
      const validUser = await User.findOne({id: msv})
      if(validUser) {
        res.status(400).json({message: 'User already exists'})
        return;
      }
      const newUser = new User({
        id: msv,
        fullname: fullname,
        account: {  
          msv: msv,
          password: hashPassword
        },
        major: major,
        k: k
      })
      await newUser.save()
      res.status(200).json({message: 'Create account success'})
    } catch (err) {
      res.status(500).json({message: err})
    }
  }
}