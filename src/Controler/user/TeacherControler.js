import Teacher from "../../Model/Teacher.model";
const Encrypt = require('../../Utils/encryption');
module.exports = {
  createTeacher: async (req, res) => {
    const { mgv, fullname } = req.body
    const hashPassword = await Encrypt.cryptPassword(mgv)
    try {
      const existUser = await Teacher.findOne({mgv: mgv})
      if (existUser) {
        return res.status(400).json({message: "Teacher already exist"});
      }
      const newTeacher = new Teacher({
        mgv: mgv.toUpperCase(), 
        fullname: fullname, 
        isAdmin: false,
        isGV: true, 
        password: hashPassword
      })
      await newTeacher.save()
      res.status(200).json(newTeacher)
    } catch (e) {
      res.status(500).json({message: "Error"})
    }
  }
}
