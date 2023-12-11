const router = require("express").Router()
const SignInControler = require('../../Controler/auth/SignInControler')
const RegisterControler = require('../../Controler/auth/RegisterControler')

router.post('/login', SignInControler.login)
router.post('/register', RegisterControler.register )


module.exports = router

