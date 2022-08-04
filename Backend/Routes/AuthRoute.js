const express = require('express')

const router = express.Router()

const {verifyEmail,checkOtp,Login} = require('../Controllers/AuthController')

router.route('/verifyemail').post(verifyEmail)

router.route('/verifyotp').post(checkOtp)

router.route('/login').post(Login)

module.exports = router