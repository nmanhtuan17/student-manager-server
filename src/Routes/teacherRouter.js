const router = require("express").Router()
const middlewareControler = require('../MiddleWare/middlewareControler')
const TeacherControler = require("../Controler/user/TeacherControler")

router.post('/create-teacher', TeacherControler.createTeacher)

module.exports = router