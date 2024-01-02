const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Course = new Schema({
  name: String,
  mm: String,
  codeName: String,
  time: {
    jd: String,
    shift: String
  },
  room: String,
  tc: Number, 
  teacher: String
})



module.exports = mongoose.model("Course", Course)