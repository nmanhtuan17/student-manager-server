const AuthRouter = require('./auth/authRouter')
const UserRouter = require('./userRouter')

const initRoute = (app) => {
  app.use('/api/auth', AuthRouter)
  app.use('/api/user', UserRouter)
  
}

module.exports = initRoute