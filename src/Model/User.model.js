const mongoose = require("mongoose")
const Schema = mongoose.Schema


const User = new Schema({
  id: String,
  fullname: String,
  account: {
    msv: String,
    password: String
  },
  major: String,
  k: String
})



module.exports = mongoose.model("User", User)