const User = require('../../Model/User.model')
const Encrypt = require('../../Utils/encryption')
module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({})
      if (users) {
        const data = users.map(user => {
          const { password, ...rest } = user._doc
          return rest
        })
        res.status(200).json({ data: data })
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  },

  getUser: async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findById(id)
      if (!user) return res.status(404).json({message: "User not found"})
      const {password, ...rest} = user._doc
      return res.status(200).json({data: rest})
    }
    catch (e) {
      console.log(e)
      res.status(500).json('Server error')
    }
  },

  createUser: async (req, res) => {
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
      res.status(200).json({message: 'Create user success', data: {user: newUser}})
    } catch (err) {
      res.status(500).json('Server error')
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findByIdAndDelete(id)
      if(!user) {
        res.status(404).json({message: 'User not exists'})
        return;
      }
      res.status(200).json({message: 'Delete user success'})
    } catch (err) {
      res.status(500).json('Server error')
    }
  }
}