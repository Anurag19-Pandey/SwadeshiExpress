require('dotenv').config()
const express = require("express")
const app = express()
const databaseconnnect = require("./db/connect")
const Port = process.env.PORT || 5000
const crypto = require("node:crypto") 
const sellerRouter =  require("./Routes/SellerRoute")
const userRouter = require("./Routes/User")
const productRouter = require("./Routes/ProductRoutes")
const cors = require('cors')
databaseconnnect()

const key = "RangeKuttaMethod"

let hash = crypto.createHash('sha256').update(key).digest('ASCII')

app.listen(Port,()=>{
    console.log("Listening at Port at ", Port );
})

app.use(cors({
    origin:"http://localhost:3000",
    method:["GET","POST","DELETE","PUT"],
    credentials:true
}))


app.use(express.json())

app.use("/user",userRouter)

app.use("/seller",sellerRouter)

app.use("/product",productRouter)