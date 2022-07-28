const db = require("../db/connect")
const {GridFsStorage} = require("multer-gridfs-storage")
const mongoose = require("mongoose");
const multer = require("multer");



let bucket ;

db.on("connected",()=>{
    var dbs = db.db
    bucket = new mongoose.mongo.GridFSBucket(dbs,{
      bucketName:"Imagebucket"
    })
})

let store = new GridFsStorage({
    url:"mongodb://localhost:27017/SwadeshiExpress",
    file:(req,file)=>{
        return new Prosmise((resolve,reject)=>{
            const filename = file.originalname;
            const fileInfo={
                filename : filename,
                bucketName:"Imagebucket"
            }
            resolve(fileInfo)
        })
    }
})

const upload =multer({storage:store})

module.exports = bucket
module.exports = upload