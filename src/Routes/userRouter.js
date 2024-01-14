const router = require("express").Router()
const UserControler = require('../Controler/user/UserControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/getAll', UserControler.getAllUser)
router.get('/:id', middlewareControler.verifyToken, UserControler.getUser)
router.post('/create', middlewareControler.verifyTokenIsAdmin, UserControler.createUser)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, UserControler.deleteUser)
module.exports = router