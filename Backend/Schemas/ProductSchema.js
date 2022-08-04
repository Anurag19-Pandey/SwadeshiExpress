const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    id:{
      type:String
    },
    productname: {
        type: String,
         required: true,
        trim: true
    },
    category:{
      type:String,
    },
    description:{
       type:String,
       required:true
    },
    price: {
         type: Number,
         required: true,
         trim: true
    },
    rating: {
        type: Number,
        default:0
    },
    size: {
        type:String,
         required: true,
         trim: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    imageId:{
        type:String
    }
});

module.exports = new mongoose.model("product", ProductSchema);
