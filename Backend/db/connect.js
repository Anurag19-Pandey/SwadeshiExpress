const mongoose = require("mongoose")

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
