const Product = require("../Schemas/ProductSchema")
const {ProductError} = require("../ErrorHandling/ProductError")
const Seller = require('../Schemas/SellerSchema')

module.exports.getAllProducts = async(req,res)=>{

    const product = await Product.find({})

    res.send(product)

}

module.exports.deleteProduct = async(req,res)=>{

    const product = await Product.findByIdAndDelete()
}

module.exports.editProduct = async(req,res)=>{
    

    const product = await Product.findByIdAndUpdate()
}
