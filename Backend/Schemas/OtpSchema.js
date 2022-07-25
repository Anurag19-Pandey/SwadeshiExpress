const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const otpSchema = new mongoose.Schema({
    email:{
      type:String
    },
    otp:{
       type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    expiredAt:{
        type:Date
    }
})

otpSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.otp = await bcrypt.hash(this.otp,salt)
    next()
})


module.exports = mongoose.model('Otp',otpSchema)