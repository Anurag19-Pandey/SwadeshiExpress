const Product = require("../Schemas/ProductSchema")
const {ProductError} = require("../ErrorHandling/ProductError")
const Seller = require('../Schemas/SellerSchema')
const mongoose = require('mongoose')
const twilio = require('twilio');
var ObjectId = require('mongoose').ObjectID;
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

module.exports.notifyseller=async(req,res)=>{
    const {id}=req.params
    const product = await Product.findById(id)
    console.log(product);
    if(product){
        if(seller){
            const client = new twilio(process.env.Account_SID, process.env.Auth_Token);
            client.messages.create({
             body:"Your product is added to the Cart",
             from:Process.env.Sender_Phone,
             to:seller.phoneno
            }).then(message => console.log(message.sid)).done();
        
            res.send("Notified");
            const seller = await Seller.findById(product.id)
            console.log(seller);
        }
        else{
            res.send("Seller does'nt exist")
        }
    }
    else{
        res.send("Product does'nt exist")
    }
}

