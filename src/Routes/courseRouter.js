const router = require("express").Router()
const CourseControler = require('../Controler/courses/CourseControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/get-all-courses', middlewareControler.verifyToken, CourseControler.getAllCourse)
router.get('/:id', middlewareControler.verifyToken, CourseControler.getCourse)
router.post('/add-course', middlewareControler.verifyTokenIsAdmin, CourseControler.createCourse)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, CourseControler.deleteCourse)
module.exports = router