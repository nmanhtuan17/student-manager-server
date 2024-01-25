import mongoose from "mongoose"
const Schema = mongoose.Schema


const TeacherModel = new Schema({
  mgv: String,
  fullname: String,
  password: String,
  isAdmin: Boolean,
  isGV: Boolean
})

const Teacher = mongoose.model("Teacher", TeacherModel)
export default Teacher