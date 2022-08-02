import React, { useState } from "react";
import HomeHeader from "../components/jsx/HomeHeader";
import ProductCategory from "../components/jsx/ProductCategory";
import ProductSection from "../components/jsx/ProductSection";
import Footer from "../components/jsx/Footer";
import "../components/css/ProductsStyles.css";
import BannerCarousel from "../components/jsx/BannerCarousel";
import { GiLoincloth } from "react-icons/gi";
import { MdChair } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";


const Products = () => {

  const [categoryProduct, setCategoryProduct] = useState([])

  const productCategory = async(type)=>{

    const {data} = await axios.get(`http://localhost:5000/product/${type}`)
    setCategoryProduct(data)
  }


  return (
    <div>
      <HomeHeader />
      
      <BannerCarousel />

      <div className="category_container_products">
        <div className="category_box_products" onClick={()=>productCategory("clothes")}>
          <GiLoincloth className="category_icon_products" />Clothing
        </div>
        <div className="category_box_products" onClick={()=>productCategory("furniture")}>
          <MdChair className="category_icon_products" />Furniture
        </div>
        <div className="category_box_products" onClick={()=>productCategory("crockery")}>
          <FaUtensils className="category_icon_products" />Crockery
        </div>
      </div>
      {
        (categoryProduct.length != 0)?<ProductCategory product={categoryProduct}/>:<ProductSection/>  
      }

      <Footer />
    </div>
  );
};

export default Products;
