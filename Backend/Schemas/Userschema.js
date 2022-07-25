const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserSchema = new schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true  
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Wishlist:{
        type:Array,
        default:[]
    }
})

const Usermodal = mongoose.model("User",UserSchema)

module.exports = Usermodal 
