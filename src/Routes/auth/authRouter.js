const router = require("express").Router()
const SignInControler = require('../../Controler/auth/SignInControler')
const RegisterControler = require('../../Controler/auth/RegisterControler')
const AuthControler = require('../../Controler/auth/AuthControler')

router.post('/login', SignInControler.login)
router.post('/register', RegisterControler.register )
router.post('/refresh', AuthControler.requestRefreshToken )

module.exports = router

