

module.exports.AuthError = (err)=>{
    let errors = {name:"",email:"",password:"",phoneno:"",others:""}

    if(err.message === "Please Enter All the Details")
    {
        errors.others = "All Fields are mandatory to fill"
        return errors
    }
    
    if(err.message === "Phone Number is incorrect")
    {
        errors.phoneno = "Incorrect Phone Number"
        return errors
    }
    if(err.message === "Password not matching")
    {
        errors.password = "Password not matching"
        return errors
    }

    if(err.message === "Please Enter valid Password")
    {
        errors.password = "Please Enter valid Password"
        return errors
    }
    if(err.message === "Please Enter Valid Email")
    {
        errors.email = "Please Enter Valid Email"
        return errors
    }
    if(err.message === "Password should be greater than 6 characters")
    {
        errors.password = "Password should be greater than 6 characters"
        return errors
    }

}