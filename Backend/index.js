require('dotenv').config()
const express = require("express")
const app = express()
const Port = process.env.PORT || 5000
const crypto = require("node:crypto") 
const sellerRouter =  require("./Routes/SellerRoute")
const connection = require('./db/connect')
const userRouter = require("./Routes/User")
const productRouter = require("./Routes/ProductRoutes")
const cors = require('cors')

const key = "RangeKuttaMethod"

let hash = crypto.createHash('sha256').update(key).digest('ASCII')

connection()



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

// app.use('/image',imageRouter)
// const conn = mongoose.connection

// conn.once("open",()=>{
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'Imagebucket'
//       });
     
//         gfs = Grid(conn.db, mongoose.mongo);
//         gfs.collection('Imagebucket');
//      })

