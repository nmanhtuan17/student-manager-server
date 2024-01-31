const mongoose = require("mongoose")
const Schema = mongoose.Schema


const User = new Schema({
  gvcn: String,
  fullname: String,
  msv: String,
  password: String,
  major: String,
  year: String,
  isAdmin: Boolean,
  isGV: Boolean,
  birthday: String,
  phone: Number,
  email: String, 
  gender: String,
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
      },
      courses: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
          }
        }
      ]
    }
  ]
})
module.exports = mongoose.model("User", User)