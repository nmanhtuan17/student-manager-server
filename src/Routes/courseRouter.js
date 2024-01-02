const router = require("express").Router()
const CourseControler = require('../Controler/course/CourseControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/getAll', middlewareControler.verifyToken, CourseControler.getAllCourse)
router.get('/:id', middlewareControler.verifyToken, CourseControler.getCourse)
router.post('/create', middlewareControler.verifyTokenIsAdmin, CourseControler.createCourse)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, CourseControler.deleteCourse)
module.exports = router