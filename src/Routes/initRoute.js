const AuthRouter = require('./auth/authRouter')


const initRoute = (app) => {
  app.use('/api/auth', AuthRouter)
}

module.exports = initRoute