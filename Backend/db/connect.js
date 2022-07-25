const mongoose = require("mongoose")

Mongo_Uri ="mongodb://localhost:27017/SwadeshiExpress"

const databaseconnnect=()=>{
    mongoose.connect(Mongo_Uri,()=>{
        console.log("Connected to Database");
    })
}

module.exports = databaseconnnect