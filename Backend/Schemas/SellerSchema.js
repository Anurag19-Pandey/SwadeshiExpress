const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true

    },
    phoneno:{
        type:Number,
        required:true

    },
    password:{
        type:String,
        required:true,
    },
    productType:{
         type:String,
        required:true,
         enum:["clothes","furniture","crockery"]
    },
    verified:{
        type:Boolean,
        default:false
    }
})


const Seller =  mongoose.model('Seller',SellerSchema)

module.exports = Seller