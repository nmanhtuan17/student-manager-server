const router = require("express").Router()
const UserControler = require('../Controler/user/UserControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/getAll',middlewareControler.verifyTokenIsAdmin, UserControler.getAllUser)
router.get('/:id', middlewareControler.verifyToken, UserControler.getUser)
router.post('/create-user', middlewareControler.verifyTokenIsAdmin, UserControler.createUser)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, UserControler.deleteUser)

module.exports = router