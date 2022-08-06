const User = require("../Schemas/Userschema")

const bcrypt = require('bcryptjs')


module.exports.registerUser = async(req,res)=>{
    try {

        const {email,name,password,phoneno} = req.body;

        const user = await User.find({email})
       
        if(user){
           res.send({message:"User Already Register"})
        }
        else{
            const hashPassword = await bcrypt.hash(password,10);

            const newUser = new User({
                name,   
                email,
                password : hashPassword,
                phoneno,
               })
             
               await newUser.save()
               res.send({message:"success"})
        }
       } catch (error) {
        res.status(500).send("Unable to Register")
       }   
}

module.exports.userWishlist=async (req,res)=>{
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
