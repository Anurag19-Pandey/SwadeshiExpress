const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

// SellerSchema.pre('save',async function(next){
   
//  const salt = await bcrypt.genSalt(10) 
//  this.password = await bcrypt.hash(this.password, salt)

//  next()

// })

// SellerSchema.methods.comparePassword = async function(candidatePassword){

//         const isMatch = await bcrypt.compare(candidatePassword,this.password)

//         return isMatch
// }
    
    
const Seller =  mongoose.model('Seller',SellerSchema)

module.exports = Seller