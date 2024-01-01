const router = require("express").Router()
const UserControler = require('../Controler/user/UserControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/getAll', middlewareControler.verifyToken, UserControler.getAllUser)

module.exports = router