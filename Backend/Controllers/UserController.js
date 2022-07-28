const Usermodal = require("../Schemas/Userschema")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const upload = require("../Middleware/Upload")

const maxAge = 3*24*60*60;

const createToken =(uid)=>{
const data = {
    user:{
        id:uid
    }
}
  const token =  jwt.sign(data,"SecretKey",{
    expiresIn:maxAge
   })
   return token;
}

module.exports.verifyuser = async (req,res)=>{
try {
    console.log("Checking verify user");
    const email = req.body.email
    const user = await Usermodal.findOne({email})
    console.log(user._id);
    console.log("Line 28",user.Password);
    if(user){
        const password = crypto.createHash('sha256').update(req.body.password).digest('hex') 
        console.log("Line 29",password);
        if(user.Password == password){
            console.log(user._id);
            const token = createToken(user._id)
            console.log(user._id);
            console.log(token);
            // res.cookie("jwt",token,{
            //    withCredentials:true,
            //    maxAge:maxAge*1000,
            //    httpOnly:true
            // })
            res.json({
                "success":true,
                "token":token,
                "id":user._id,
            })
        }
        else{
            res.send("Nope still error go check plzz")
        }
    }
    else{
        res.send("User is still the problem")
    }
} catch (error) {
    res.send(error)
}
}

module.exports.Wishlist=async (req,res)=>{
    try {
        const proceed = await Usermodal.findById(req.user.id)
        // console.log(proceed)
        console.log(req.user.id)
        const perform = req.header("action")
        if(proceed){
            if(perform =="remove"){
                const action = await Usermodal.findByIdAndUpdate(req.user.id,{$pull:{"Wishlist":req.params.id}},{new:true})
                console.log(action);
                res.send("Removed Successfully");
            }
            if(perform=="add"){
                const action = await Usermodal.findByIdAndUpdate(req.user.id,{$push:{"Wishlist":req.params.id}},{new:true})
                console.log(action);
                res.send("Added Succesfully")
            }
        }
        else{
            res.send("No such user Exist")
        }
    } catch (error) {
        res.send(error)
    }
}