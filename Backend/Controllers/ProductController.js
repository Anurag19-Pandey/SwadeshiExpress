const Product = require("../Schemas/ProductSchema")
const {ProductError} = require("../ErrorHandling/ProductError")
const Seller = require('../Schemas/SellerSchema')
const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')

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


module.exports.addtoCartProduct = async(req,res)=>{
  try{

    const id = req.id

    const product = await Product.findOne({_id:req.params.pid})
   
    const updateAddtoCart = await Seller.findByIdAndUpdate({_id:id},{
        $addToSet:{
            "addtoCart":product
        }
    })

    if(updateAddtoCart)
    {
        res.send("updated")
    }
    else{
        res.send({message:"Some Error Occured"})
    }
    
    // else{
    //     res.send({message:"Error"})
    // }
   }catch(err){
    console.log(err)
   }

}

module.exports.getaddToCart = async(req,res)=>{
    try{

        const {id} = req.params

        const seller = await Seller.findOne({_id:id})

        if(seller){
            res.send(seller.addtoCart)
        }
        else{
            res.send({message:"Please Login"})
        }

    }catch(err){

    }
}

module.exports.deleteaddtoProduct = async(req,res)=>{

    try{
        
       const seller = await Seller.findOne({_id:req.params.id})

       for(let i=0;i<seller.addtoCart.length;i++){
          if(seller.addtoCart[i]._id == req.params.pid){
            seller.addtoCart.splice(i,1);
          }
       }

      await seller.save()
      res.send(seller.addtoCart)
              
    }catch(err){ 

        console.log(err)

    }

 

}