

module.exports.VerificationError = async(err)=>{
    let errors = {otp:"",email:"",others:""}

    if(err.message == "You have to register before verifying")
    {
         errors.email = "You have to register before verifying"
         return errors
    }
    
    if(err.message == "Invalid")
    {
         errors.others = "Invalid"
         return errors
    }

    if(err.message == "Email Id is incorrect")
    {
         errors.email = "Email Id is incorrect"
         return errors
    }
    if(err.message == "Code has expired !")
    {
         errors.otp = "Code has expired !"
         return errors
    }
    if(err.message == "Invalid Code Passed.Check Your inbox ")
    {
         errors.otp = "Invalid Code Passed.Check Your inbox "
         return errors
    }
    if(err.message == "Invalid User")
    {
         errors.others = "Invalid User"
         return errors
    }
    

}