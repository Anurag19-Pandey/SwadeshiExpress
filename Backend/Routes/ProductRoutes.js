const express = require('express')

const router = express.Router()

const {getAllProducts} = require("../Controllers/ProductController")

router.route('/getallproducts').get(getAllProducts)

module.exports = router


