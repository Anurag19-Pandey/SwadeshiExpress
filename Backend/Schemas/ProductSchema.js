const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    id:{
      type:String
    },
    name: {
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
        required: true,
        trim: true
    },
    size: {
        type:String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = new mongoose.model("product", ProductSchema);
