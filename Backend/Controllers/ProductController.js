const Product = require("../Schemas/ProductSchema")
const {ProductError} = require("../ErrorHandling/ProductError")
const Seller = require('../Schemas/SellerSchema')

module.exports.getAllProducts = async(req,res)=>{

    const product = await Product.find({})

   res.json({
    products:product
   })

}
