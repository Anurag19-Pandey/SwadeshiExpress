const jwt = require("jsonwebtoken")
const token = "SecretKey"

module.exports.fetchuser=(req,res,next)=>{
    try {
        const Token = req.header("auth-token")
        if(Token){
            console.log(Token)
            const data = jwt.verify(Token,token);
            req.user = data.user;
            console.log(data.user.id);
            next();
        }
        else{
            res.send("Login again.")
        }
    } catch (error) {
        console.log(error);
        res.send("Internal server Error")
    }
}
