const User = require('../../Model/User.model')

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({})
      if(users) {
        const data = users.map(user => {
          const {password, ...rest} = user._doc
          return rest
        })
        res.status(200).json({data: data})
      }
    } catch (error) {
      res.status(500).json({message: "Server error"})
    }
  }
}