const express = require("express")
const Usermodal = require("../Schemas/Userschema")
const router = express.Router()
const crypto = require("crypto")

router.post("/auth", async(req,res)=>{
   try {
    const email = req.body.email;
    const proceed = await Usermodal.find({Email:email})
    console.log(proceed.length);
    if(proceed.length){
       res.send("Try another way")
    }
    else{
        const details={
            Name:req.body.name,   
            Email:email,
            Password : crypto.createHash('sha256').update(req.body.password).digest("ASCII"),
            Phone: req.body.phone,
           }
   
           const user =  await Usermodal.create(details);
           if(user){
               console.log(user);
           }
           res.send("account created")
    }
   } catch (error) {
    res.status(500).send("Server facing problems")
   }   
})

router.post("/verif")


module.exports =router