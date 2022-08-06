const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true  
    },
    password:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    wishlist:{
        type:Array,
        default:[]
    },
    addToCart:{
        type:Array,
        default:[]
    },
    userHistory:{
        type:Array,
        default:[]
    }
})

const Usermodal = mongoose.model("User",UserSchema)

module.exports = Usermodal 
