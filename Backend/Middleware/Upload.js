const db = require("../db/connect")
const connection = require('../db/connect')
const {GridFsStorage} = require("multer-gridfs-storage")
const mongoose = require("mongoose");
const multer = require("multer");
const Grid = require('gridfs-stream')

// let gfs,gridfsBucket;

// const conn = mongoose.connection

// conn.once("open",()=>{
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'Imagebucket'
//       });
     
//         gfs = Grid(conn.db, mongoose.mongo);
//         gfs.collection('Imagebucket');
//      })

const storage = new GridFsStorage({
    url:"mongodb+srv://AnkitYadav:Ankit%40atlas@swadeshiexpress.q8yepl7.mongodb.net/SwadeshiExpress?retryWrites=true&w=majority",
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    file:(req,file)=>{
        const match = ["image/jpeg","image/png","image/jpg"]
        if(match.indexOf(file.mimetype) === -1){
            const filename = `${file.originalname}`;
            return filename
        }
        return {
           bucketName:"Imagebucket",
           filename:`${file.originalname}`
        }
    }
})

const upload = multer({storage})

module.exports = upload
