const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserModel = new Schema({
  fullname: String,
  msv: String,
  password: String,
  major: String,
  k: String,
  isAdmin: Boolean,
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      score: {
        type: Number
      }
    }
  ],
  semesters: [
    {
      semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester"
      }
    }
  ]
})

const User = mongoose.model("User", UserModel)
export default User