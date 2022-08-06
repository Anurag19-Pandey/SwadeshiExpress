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

module.exports.categoryProduct = async(req,res)=>{
   
    const {type} = req.params

    const product = await Product.find({category:type})

    if(product){
        res.send(product)
    }else{
        res.send("No Products are available")
    }
}

module.exports.comment = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    const comment={
        review:req.body.review,
        user:req.body.user,
        date:Date.now()
    }

    console.log("comment is ",comment);
    const prod = await Product.findById(id)
    console.log(prod);
    const product = await Product.findByIdAndUpdate(id,{$push:{"comments":comment}},{new:true})
    console.log(product);
    if(product){
        res.send("Posted")
    }
    else{
        res.send("Unable to post")
    }
}

module.exports.getcomments = async(req,res)=>{
    const {id}=req.params
    const product = await Product.findById(id)
    console.log(product);
    if(product){
        const commentlist = product.comments
        res.send(commentlist)
    }
    else{
        res.send("Product does'nt exist")
    }

}
