const Seller = require('../Schemas/SellerSchema')
const jwt  = require("jsonwebtoken")

module.exports.CheckSeller = (req,res,next)=>{
    const token = req.headers.jwt;
    if(token){
        jwt.verify(token,"SecretKey",async(err,decodedToken)=>{   // header,payload,signature
            if(err){
                
                res.json({
                        status:false
                    });
                next();
            }else{
                    const user = await Seller.findById(decodedToken.id)
                  
                    if(user)
                    {
                        req.id = decodedToken.id
                        next();
                    }
                else{
                  
                    res.json(
                        {
                            status:false
                        })
                }
            }
        })
    }else{

        res.json(
            {
                status:false
            })
    }
}