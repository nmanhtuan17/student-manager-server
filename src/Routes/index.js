const AuthRouter = require('./auth/authRouter')
const UserRouter = require('./userRouter')
const CourseRouter = require('./courseRouter')
const initRoute = (app) => {
  app.use('/api/auth', AuthRouter)
  app.use('/api/user', UserRouter)
  app.use('/api/course', CourseRouter)
  
}

module.exports = initRoute