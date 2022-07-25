

module.exports.ProductError = (err)=>{
    let errors = {name:"",quantity:"",price:"",id:"",rating:"",size:"",others:""}

    if(err.message === "Please Enter All the Details")
    {
        errors.others = "All Fields are mandatory to fill"
        return errors
    }

    if(err.message === "Seller Does not Exist"){
        errors.id = "Seller Does not Exist"
        return errors
    }
}