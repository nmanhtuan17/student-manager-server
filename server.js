const express = require("express")
const cors = require("cors")
const initRoute = require('./src/Routes')
const connect = require('./src/Config/db/index')
const cookieParser = require('cookie-parser')
require('dotenv').config()
import { OAuth2Client } from 'google-auth-library'
const app = express()
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// })
app.use(cookieParser());

const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

export const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
})





initRoute(app)
connect()



app.listen(port, (err) => {
  if(err) console.log(err)
  console.log(`Server listening in port ${port}`);
})
