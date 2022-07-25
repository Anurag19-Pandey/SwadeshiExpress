const Seller = require('../Schemas/SellerSchema')
const {AuthError} = require("../ErrorHandling/AuthErrors")
const Product = require("../Schemas/ProductSchema")
const Otp = require('../Schemas/OtpSchema')
const bcrypt = require('bcryptjs')
const {ProductError} = require("../ErrorHandling/ProductError")
const nodemailer = require('nodemailer')
const {VerificationError} = require('../ErrorHandling/VerifyError')

const maxAge =  3*24*60*60
const {google} = require("googleapis")


const jwt  = require("jsonwebtoken")

const createToken = (id)=>{
   return jwt.sign({id},"SecretKey",{
      expiresIn:maxAge
   })
}

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENTID,process.env.GOOGLE_SECRET,process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:process.env.AUTH_EMAIL,
                clientId:process.env.GOOGLE_CLIENTID,
                clientSecret:process.env.GOOGLE_SECRET,  
                refreshToken:process.env.REFRESH_TOKEN      
            }
        })

module.exports.sellerRegister = async(req,res)=>{

 try{

    const {name,email,phoneno,password,confirmpassword,productType} = req.body

    if(!name || !email || !phoneno || !password || !confirmpassword || !productType)
    {
        throw Error("Please Enter All the Details")
    }
   
    if(phoneno.toString().length !=10)
    {
        throw Error("Phone Number is incorrect")    
    }

    if(password.length < 6)
    {
      throw Error("Password should be greater than 6 characters")     
    }

    if(password != confirmpassword)
    {
        throw Error("Password not matching") 
    }

    const user = await Seller.findOne({email})

     if(user)
     {
        throw Error("User already exist") 
     }else{
        const newUser = await Seller.create({
            name,
            email,
            password,
            phoneno,
            productType
        })
        await newUser.save()
        res.send({
         message:"User created successfully",
         newUser
        })
     }

  }catch(err){
     const errors = AuthError(err)
     res.json({
        errors
     })
  } 
}


module.exports.sellerLogin = async(req,res)=>{

    try{

      const {email,password} = req.body

      if(!email || !password)
      {
         throw Error("Please Enter All the Details")
      }
     const user = await Seller.findOne({email})

     if(user)
     {
      // const validPassword = await bcrypt.compare(password,user.password)
      // console.log(validPassword)
        if(user.password == password)
        {

            const token = createToken(user._id)

            res.cookie("jwt",token,{
              withCredentials:true,
              httpOnly:true,
              maxAge:maxAge*1000
         })
          res.json({
            message:"Successfull Login",
            id:user._id,
            token:token
          })
        }
        else{
       
         throw Error("Please Enter valid Password")
        }
     }
     else
     {

        throw Error("Please Enter Valid Email")
     }
    }catch(err){
      const errors = AuthError(err)
      res.json({
         errors
      })
    }
}


module.exports.addProduct = async(req,res,next)=>{
   try{

     const {name,category,quantity,price,rating,size,description} = req.body
     
     const id = req.params
 
     if(!id || !name || !category || !quantity || !price || !rating || !size || !description){
         throw Error("Please Enter All the Details")
     } 
 
     const seller = await Seller.findOne({id})
 
     if(seller){
     const newProduct = new Product({
         id,
         name,
         category,
         quantity,
         price,
         rating,
         size,
         description
     })
 
    await newProduct.save()
    res.json({
     message:"Product Created Successfully",
     product:newProduct
    })
 }else{
     throw Error("Seller Does not Exist")
 }
 }catch(err){
     const errors = ProductError(err)
      res.json({
         errors
      })
 }
 }

module.exports.editProduct = async(req,res)=>{
   try{
   const {p_id} = req.params

   const {name,category,quantity,price,rating,size,description} = req.body

   if(!name || !category || !quantity || !price || !rating || !size || !description){
      throw Error("Please Enter All the Details")
  } 

   const id = req.id

   const seller = await Seller.findOne({id})
 
   if(seller)
   {
      const product = await Product.findById({_id:p_id})
      
      if(product){
      const updateProduct = await Product.findByIdAndUpdate({
         _id:p_id
      },{
         name,
         category,
         quantity,
         price,
         rating,
         size,
         description
      })

      res.send({
         status:"true"
      })
   }
   }else{
      throw Error("Seller Does not Exist")
  }

}catch(err){
   const errors = ProductError(err)
    res.json({
       errors
    })
}

 }
 
 module.exports.deleteProduct = async(req,res)=>{
try{
   const {p_id} = req.params
     
   const id = req.id

   const seller = await Seller.findOne({id})

   
   if(seller)
   {
      const product = await Product.findById({_id:p_id})
     if(product){
      
      const deletedProduct = await Product.findByIdAndDelete({
         _id:p_id
      })
      res.json({
         status:"true"
      })
   }
   }else{
      throw Error("Seller Does not Exist")
  }
}catch(err){
   const errors = ProductError(err)
    res.json({
       errors
    })
}
 }

 
const sendOtp = async({email})=>{
   
   try{
      const otp = Math.floor(Math.random()*(10000-1000)+1000)
      const expiredAt = Date.now()+3600000
        const mailOptions = {
              from:process.env.AUTH_EMAIL,
              to:email,
              subject:"Verfy Your Email",
              html:`<p>Please Enter the ${otp} in the app to verify your email address and complete the registeration process</p>
              <p>The code expires in 1 hour</p>`
          }
       
     const newUser = await Otp.create({email,otp,createdAt:Date.now(),expiredAt})

     const result = await transporter.sendMail(mailOptions)


  }catch(err){
      console.log(err)
  }

}

module.exports.verifyEmail = async(req,res)=>{
   try{
      const {email} = req.body
      const user = await Seller.findOne({email})
      
      if(!user){
          throw Error("You have to register before verifying")
      }
      else{
   
          await sendOtp(user)

      res.status(200).json({
          email,
          created:true
      })
   }
  }catch(err){
     const errors = VerificationError(err)
     res.json({
      errors
     })
  }
}


module.exports.checkOtp = async(req,res)=>{
   try{
    const {otp,email} = req.body
    
    if(!otp || !email){
        throw Error("Invalid")
    }

    const user = await Otp.findOne({email})
   
    if(!user){
        throw Error("Email Id is incorrect")
    }
    else{
        if(user.expiredAt < Date.now())
        {
            throw Error("Code has expired !")
        }else{
           const validOtp = await bcrypt.compare(otp,user.otp)
            if(!validOtp){
                throw Error("Invalid Code Passed.Check Your inbox ")
            }
            else{
                await Seller.updateOne({email},{
                    $set:{
                        verified:true
                    }
                })
                await Otp.deleteMany({email})
                res.status(200).json({
                    created:true
                })
            }
        }
    }

}catch(err){
    const errors = VerificationError(err)
    res.json({
        errors,created:false
       })
}
    
}