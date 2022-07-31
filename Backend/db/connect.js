const mongoose = require("mongoose")


// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }) 

// const db = mongoose.connection;

// db.on("error",console.error.bind(console,"Error in connecting Database!"))
// db.once("open",()=>{
//     console.log("Database Connected")
// })

module.exports = async function connection(){
    try{
     const connectionParams = {
        useNewUrlParser: true,
     useUnifiedTopology: true
     }
     await mongoose.connect(process.env.MONGO_URI,connectionParams)
     console.log('Connected to database')
    }catch(err){
      console.log(err)
      console.log('Could not connect to database')
    }
}
