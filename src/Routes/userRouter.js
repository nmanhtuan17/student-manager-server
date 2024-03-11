const router = require("express").Router()
const UserControler = require('../Controler/user/UserControler')
const middlewareControler = require('../MiddleWare/middlewareControler')

router.get('/get-all-users',middlewareControler.verifyTokenIsAdmin, UserControler.getAllUser)
router.get('/:id', middlewareControler.verifyToken, UserControler.getUser)
router.post('/create-user', middlewareControler.verifyTokenIsAdmin, UserControler.createUser)
router.post('/delete/:id', middlewareControler.verifyTokenIsAdmin, UserControler.deleteUser)
router.post('/update-profile/:id', middlewareControler.verifyToken, UserControler.updateProfile)
router.post('/update-teacher/:id', middlewareControler.verifyTokenIsAdmin, UserControler.updateGv)
module.exports = router