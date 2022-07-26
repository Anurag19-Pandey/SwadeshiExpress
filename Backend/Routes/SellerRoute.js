const express = require('express')
const Seller = require('../Schemas/SellerSchema')
// const {AuthError} = require("../ErrorHandling/AuthErrors")
const {ProductError} = require("../ErrorHandling/ProductError")
const Product = require("../Schemas/ProductSchema")

const router = express.Router()


const {sellerRegister, deleteProduct,addProduct,editProduct,sellerDetails} = require("../Controllers/SellerController")

const {CheckSeller} = require("../Middleware/AuthMiddleware")

router.route('/register').post(sellerRegister)

// router.route('/login').post(sellerLogin)

// router.route('/verifyemail').post(verifyEmail)

// router.route('/verifyotp').post(checkOtp)


router.route('/sellerdashboard').post(CheckSeller)

router.route('/sellerdetails/:id').get(sellerDetails)

router.route('/addproduct').post(CheckSeller,addProduct)

router.route('/editproduct/:p_id').put(CheckSeller,editProduct)

router.route('/deleteproduct/:p_id').delete(CheckSeller,deleteProduct)

module.exports = router



