const Seller = require('../Schemas/SellerSchema')
const jwt  = require("jsonwebtoken")

module.exports.CheckSeller = async(req,res,next)=>{
    try{
       const token = req.cookies.jwt
    if(token){
     
        jwt.verify(token,"SecretKey",async(err,decodedToken)=>{   // header,payload,signature
            if(err){
                res.send({message:"Invalid User 1"})
               
            }else{
                    const seller = await Seller.findById(decodedToken.id)
                  
                    if(seller)
                    {
                       if(req.params.pid){

                           req.id = decodedToken.id
                           next()
                           
                       }
                      else{
                        res.json({
                            id:decodedToken.id
                        })
                    }
                    }
                else{
                    res.send({message:"Invalid User 2"})
                }
            }
        })
    }else{
        res.send({message:"Invalid User 3"})
    }
}catch(err){
    console.log(err)
//    res.send({message:"Invalid User 4"})
}
}