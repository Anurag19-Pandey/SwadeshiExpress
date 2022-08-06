const jwt = require("jsonwebtoken")

const User = require("../Schemas/Userschema")

module.exports.checkUser=(req,res,next)=>{
    try{
        
        const token = req.cookies.jwt;

        if(token){
            jwt.verify(token,"SecretKey",async(err,decodedToken)=>{   
                if(err){
                   throw Error("Invalid User") 
                   
                }else{
                        const user = await User.findById(decodedToken.id)
                      
                        if(user)
                        {
                            req.id = decodedToken.id
                            next();
                        }
                    else{
                        res.send({message:"Invaid User"})
                    }
                }
            })
        }else{
            res.send({message:"Invaid User"})
        }
    }catch(err){
       console.log(err)
    }
}
