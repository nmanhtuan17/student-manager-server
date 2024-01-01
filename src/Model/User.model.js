const mongoose = require("mongoose")
const Schema = mongoose.Schema


const User = new Schema({
  fullname: String,
  msv: String,
  password: String,
  major: String,
  k: String,
  isAdmin: Boolean
})



module.exports = mongoose.model("User", User)