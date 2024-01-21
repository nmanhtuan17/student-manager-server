import User from '@/Model/User.model'
const Encrypt = require('../../Utils/encryption')
module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({})
        .populate({
          path: 'semesters.semester',
          populate: { path: 'courses.course' }
        })
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
        .populate({
          path: 'semesters.semester',
          populate: { path: 'courses.course' }
        })
      if (!user) return res.status(404).json({ message: "User not found" })
      const { password, ...rest } = user._doc
      return res.status(200).json({ data: rest })
    }
    catch (e) {
      res.status(500).json('Server error')
    }
  },

  createUser: async (req, res) => {
    const { fullname, msv, major, year, gvcn } = req.body
    const hashPassword = await Encrypt.cryptPassword(msv)
    try {
      const validUser = await User.findOne({ msv: msv });
      const gv = await User.findOne({mgv: gvcn});
      if (validUser) {
        res.status(400).json({ message: 'User already exists' })
        return;
      }
      if (!gv) {
        res.status(404).json({ message: "Don't found teacher" })
        return;
      }
      const newUser = new User({
        msv: msv,
        gvcn: gv._id,
        fullname: fullname,
        password: hashPassword,
        major: major,
        year: year,
        isAdmin: false,
        isGV: false
      })
      await newUser.save()
      res.status(200).json({ message: 'Create user success', data: { user: newUser } })
    } catch (err) {
      res.status(500).json('Server error')
    }
  },

  createGv: async (req, res) => {
    const { fullname, mgv } = req.body
    const hashPassword = await Encrypt.cryptPassword(mgv)
    try {
      const validUser = await User.findOne({ mgv: mgv });
      if (validUser) {
        res.status(400).json({ message: 'User already exists' })
        return;
      }
      const newUser = new User({
        mgv: mgv,
        fullname: fullname,
        password: hashPassword,
        isAdmin: false,
        isGV: true
      })
      await newUser.save()
      res.status(200).json({ message: 'Create user success', data: { user: newUser } })
    } catch (err) {
      res.status(500).json('Server error')
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        res.status(404).json({ message: 'User not exists' })
        return;
      }
      res.status(200).json({ message: 'Delete user success' })
    } catch (err) {
      res.status(500).json('Server error')
    }
  }

}