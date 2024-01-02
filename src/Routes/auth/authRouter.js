const router = require("express").Router()
const AuthControler = require('../../Controler/auth/AuthControler')

router.post('/login', AuthControler.login)
router.post('/refresh', AuthControler.requestRefreshToken )

module.exports = router

