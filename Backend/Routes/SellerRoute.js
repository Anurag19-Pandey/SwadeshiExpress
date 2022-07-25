const express = require('express')
const Seller = require('../Schemas/SellerSchema')
// const {AuthError} = require("../ErrorHandling/AuthErrors")
const {ProductError} = require("../ErrorHandling/ProductError")
const Product = require("../Schemas/ProductSchema")

const router = express.Router()


const {sellerLogin,sellerRegister, deleteProduct,addProduct,editProduct,verifyEmail,checkOtp} = require("../Controllers/SellerController")

const {CheckSeller} = require("../Middleware/AuthMiddleware")

router.route('/register').post(sellerRegister)

router.route('/login').post(sellerLogin)

router.route('/verifyemail').post(verifyEmail)

router.route('/verifyotp').post(checkOtp)

// router.route('/forgotpassword').post()

router.route('/sellerdashboard').post(CheckSeller)

router.route('/addproduct').post(CheckSeller,addProduct)

router.route('/editproduct/:p_id').put(CheckSeller,editProduct)

router.route('/deleteproduct/:p_id').delete(CheckSeller,deleteProduct)

module.exports = router



