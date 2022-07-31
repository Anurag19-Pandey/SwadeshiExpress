const Product = require("../Schemas/ProductSchema")
const {ProductError} = require("../ErrorHandling/ProductError")
const Seller = require('../Schemas/SellerSchema')
const mongoose = require('mongoose')
var ObjectId = require('mongoose').ObjectID;

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

module.exports.singleProduct = async(req,res)=>{

    const {id} = req.params

    const product = await Product.findOne({_id:id})

    res.send(product)

}