const mongoose = require("mongoose")

Mongo_Uri ="mongodb://localhost:27017/SwadeshiExpress"

mongoose.connect(Mongo_Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting Database!"))
db.once("open",()=>{
    console.log("Database Connected")
})

module.exports = db