const mongoose = require("mongoose")
const Schema = mongoose.Schema


const User = new Schema({
  mgv: String,
  gvcn: String,
  fullname: String,
  msv: String,
  password: String,
  major: String,
  year: String,
  isAdmin: Boolean,
  isGV: Boolean,
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
module.exports = mongoose.model("User", User)