const express = require("express")

const router = express.Router()

const {checkUser} = require("../Middleware/Fetchuser")

const {userWishlist,registerUser} = require("../Controllers/UserController")

router.route("/register").post(registerUser)

router.route("/wishlist/:id").put(checkUser,userWishlist)

module.exports = router