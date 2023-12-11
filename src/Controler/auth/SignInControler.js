const User = require("../../Model/User.model")
const jwt = require('jsonwebtoken')
const Encrypt = require('../../Utils/encryption')

module.exports = {
  login: async (req, res) => {
    const {msv, password} = req.body
    console.log(req.body);
    try {
      const user = await User.findOne({id: msv})
      console.log(user)
      if(!user){
        res.status(401).json({message: 'user not exist'});
        return;
      }
      const comparePassword = await Encrypt.comparePassword(password, user.account.password)
      console.log(comparePassword)
      if(comparePassword){
        const accessToken = jwt.sign({
          id: user._id,
          role: user.role
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '1d' }
        )
        res.status(200).json({message: 'Login success', data: {user: user}, token: accessToken})
      } else {
        res.status(400).json({message: 'Wrong password'})
      }
    } catch (error) {
      res.status(500).json({message: 'server error', error: error})
    }
  }
}