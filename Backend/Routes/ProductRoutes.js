const express = require('express')
const mongoose = require("mongoose");
const Grid = require('gridfs-stream')
const router = express.Router()
const Product = require('../Schemas/ProductSchema')
const Seller = require('../Schemas/SellerSchema')

const {getAllProducts, deleteProduct,editProduct,singleProduct,categoryProduct,addtoCartProduct,getaddToCart,deleteaddtoProduct,comment,getcomments} = require("../Controllers/ProductController")

const {CheckSeller} = require("../Middleware/AuthMiddleware")


const upload = require('../Middleware/Upload')

let gfs,gridfsBucket;

const conn = mongoose.connection

conn.once("open",()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'Imagebucket'
      });
     
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('Imagebucket');
})

router.route('/getallproducts').get(getAllProducts)

router.route('/upload/:id').post(upload.single("file"),async(req,res)=>{
    if(req.file === undefined)
    {   
    return res.send({status:false})
    }
    else{
            const newProduct = new Product({
                id:req.params.id,
                productname:req.body.productname,
                category:req.body.category,
                description:req.body.description,
                price:req.body.price,
                rating:req.body.rating,
                size:req.body.size,
                quantity:req.body.quantity,
                imageId:req.file.id
            })
            await newProduct.save()
        
            res.redirect('http://localhost:3000/products')
    }
   
 
})

router.route('/file/:s_id').get(async(req,res)=>{
    try{
 
         const seller = await Product.find({id:req.params.s_id})
        //    console.log(seller)
           const imagearray = []
           for(i=0;i<seller.length;i++)
           {
                 var newId = mongoose.Types.ObjectId(seller[i].imageId)

              file = await gfs.files.findOne({_id:newId})
            
              
              const readStream = gridfsBucket.openDownloadStream(file._id)
              
              readStream.pipe(res)
              imagearray.push(file)  
           }

           res.send(imagearray)
    
    }catch(err){
        console.log(err)
         res.send("not found")
    }
})

router.route("/file/:id").delete(async(req,res)=>{
    try{
        await gfs.files.deleteOne({_id:req.params.id})
        res.send("success")
    }catch(err){
        res.send("failure")
    }

})

router.get('/allproductsimage',(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        //check if files 
        if(!files || files.length === 0 ){
          res.render('first',{files:false})
        }else{
            files.map(file=>{
                    if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                        file.isImage = true
                    }else{
                        file.isImage = false
                    }
            })
        }
        // console.log(files)
         res.send(files)
      })
})

router.get('/images/:id',(req,res)=>{
    gfs.files.findOne({_id:mongoose.Types.ObjectId(req.params.id)},(err,file)=>{
        //check if files 
        if(!file || file.length === 0 ){
          return res.status(404).json({
              err:'No file exist'
          })
        }
       if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
        const readStream = gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(res)
       }else{
         res.status(404).json({
            err:'No file image'
        })
       }
      })
})

router.route('/getproduct/:id').get(singleProduct)

router.route('/deleteproduct').delete(deleteProduct)

router.route('/editproduct').put(editProduct)

router.route('/:type').get(categoryProduct)
 
router.route('/addtocart/:pid').post(CheckSeller,addtoCartProduct)

router.route('/getaddtocart/:id').get(getaddToCart)

router.route('/deleteproductaddtocart/:id/:pid').delete(deleteaddtoProduct)


router.route('/postcomment/:id').post(comment)

router.route('/getcomments/:id').get(getcomments)

module.exports = router


