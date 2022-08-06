const Seller = require("../Schemas/SellerSchema")
const User = require("../Schemas/Userschema")
const Otp = require("../Schemas/OtpSchema")
const nodemailer = require('nodemailer')
const bcrypt = require("bcryptjs")

const maxAge = 3*24*60*60;

const { google } = require("googleapis")


const jwt = require("jsonwebtoken")

const createToken = (id) => {
   return jwt.sign({ id }, "SecretKey", {
      expiresIn: maxAge
   })
}

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENTID, process.env.GOOGLE_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
       type: "OAuth2",
       user: process.env.AUTH_EMAIL,
       clientId: process.env.GOOGLE_CLIENTID,
       clientSecret: process.env.GOOGLE_SECRET,
       refreshToken: process.env.REFRESH_TOKEN
    }
 })
 

const sendOtp = async ({ email }) => {

    try {
       const otp = Math.floor(Math.random() * (10000 - 1000) + 1000)
       const expiredAt = Date.now() + 3600000
       const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "Verfy Your Email",
          html: `<p>Please Enter the ${otp} in the app to verify your email address and complete the registeration process</p>
               <p>The code expires in 1 hour</p>`
       }
 
       const newUser = await Otp.create({ email, otp, createdAt: Date.now(), expiredAt })
 
       const result = await transporter.sendMail(mailOptions)
 
 
    } catch (err) {
       console.log(err)
    }
 
 }
 

module.exports.verifyEmail = async (req, res) => {
    try {
       const { email } = req.body
       const seller = await Seller.findOne({ email })
 
       if (!seller) {

         const user = await User.findOne({email})

         if(!user)
         {
            res.send({message:"User Not Registered"})

         }else{
            await sendOtp(user)
 
            res.status(200).json({email})
         }

       }
       else {
 
          await sendOtp(seller)
 
          res.status(200).json({email})
       }
    }catch(err){
        console.log(err)
    }           
 }
 
 module.exports.checkOtp = async(req,res)=>{
    try{
     const {otp1,otp2,otp3,otp4,email} = req.body
 
     const otp = `${otp1}`+`${otp2}`+`${otp3}`+`${otp4}`
 
     const user = await Otp.findOne({email})
    
     if(!user){
         res.send({message:"Email Id is incorrect"})
     }
     else{
         if(user.expiredAt < Date.now())
         {
             await Otp.deleteMany({email})
             res.send({message:"Time Exceeded"})
         }else{
            const validOtp = await bcrypt.compare(otp,user.otp)
             if(!validOtp){
                res.send({message:"Invalid Otp"})
             }
             else {

                  const seller = await Seller.findOne({email})

                  if(seller){
                     await Seller.updateOne({ email }, {
                        $set: {
                           verified: true
                        }
                     })
                     await Otp.deleteMany({ email })
                     res.status(200).json({message:"success"})
                  }else{
                     
                     const customer = await User.findOne({email})

                     if(customer){
                        await User.updateOne({ email }, {
                           $set: {
                              verified: true
                           }
                        })
                        await Otp.deleteMany({ email })
                        res.status(200).json({message:"success"})
                     }
                  }
               
             }
         }
     }
 
 }catch(err){
   console.log(err)
 }
     
}

module.exports.Login = async(req,res)=>{
   
   try {

      const { email, password } = req.body

      const seller = await Seller.findOne({ email })

      if (seller) {
          const validPassword = await bcrypt.compare(password,seller.password)

         if (validPassword) {

            const token = createToken(seller._id)

            res.cookie("jwt", token, {
               withCredentials:true,
               httpOnly:false,
               maxAge:maxAge*1000
            }) 
   
            res.send({message:"seller",id:seller._id})
         }
         else {
           res.send({message:"Invalid Credentials"})
         }
      }
      else {

         const user = await User.findOne({ email })

         if(user){

            const validPassword = await bcrypt.compare(password,user.password)
            if (validPassword) {
               const token = createToken(user._id)
   
               res.cookie("jwt", token, {
                  withCredentials: true,
                  httpOnly: true,
                  maxAge: maxAge * 1000
               })
               console.log("User Token",token)
               res.send({message:"user",id:user._id})
            }
            else {
              res.send({message:"Register Before Login"})
            }
         }
      }
   } catch (err) {
      console.log(err)
   }
}

 