const Seller = require('../Schemas/SellerSchema')

const jwt  = require("jsonwebtoken")

const {VerificationError} = require('../ErrorHandling/VerifyError')

module.exports.CheckSeller = async(req,res,next)=>{
    try{
    if(token){
        jwt.verify(token,"SecretKey",async(err,decodedToken)=>{   // header,payload,signature
            if(err){
               throw Error("Invalid User") 
               
            }else{
                    const user = await Seller.findById(decodedToken.id)
                  
                    if(user)
                    {
                        req.id = decodedToken.id
                        next();
                    }
                else{
                    throw Error("Invalid User") 
                }
            }
        })
    }else{
        throw Error("Invalid User") 
    }
}catch(err){
    const error = VerificationError(err)
    res.json({
        error
    })
}
}