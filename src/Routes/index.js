const AuthRouter = require('./auth/authRouter')
const UserRouter = require('./userRouter')
const CourseRouter = require('./courseRouter')
const SemesterRouter = require('./semesterRouter')
const TeacherRouter = require('./teacherRouter')
const initRoute = (app) => {
  app.use('/api/auth', AuthRouter)
  app.use('/api/user', UserRouter)
  app.use('/api/course', CourseRouter)
  app.use('/api/semester', SemesterRouter)
  app.use('/api/teacher', TeacherRouter)
}

module.exports = initRoute