const express = require("express")
const cors = require("cors")
const initRoute = require('./src/Routes')
const connect = require('./src/Config/db/index')
const cookieParser = require('cookie-parser')

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





initRoute(app)
connect()



app.listen(port, (err) => {
  if(err) console.log(err)
  console.log(`Server listening in port ${port}`);
})
