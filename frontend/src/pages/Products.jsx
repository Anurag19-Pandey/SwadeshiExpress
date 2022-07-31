import React, { useState } from "react";
import HomeHeader from "../components/jsx/HomeHeader";
import ProductSection from "../components/jsx/ProductSection";
import Footer from "../components/jsx/Footer";
import "../components/css/ProductsStyles.css";
import BannerCarousel from "../components/jsx/BannerCarousel";
import { GiLoincloth } from "react-icons/gi";
import { MdChair } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";


const Products = () => {
  const [category, setCategory] = useState("")
  return (
    <div>
      <HomeHeader />

      <BannerCarousel />

      <div className="category_container_products">
        <div className="category_box_products" onClick={() => setCategory("clothing")}>
          <GiLoincloth className="category_icon_products" />Clothing
        </div>
        <div className="category_box_products" onClick={() => setCategory("furniture")}>
          <MdChair className="category_icon_products" />Furniture
        </div>
        <div className="category_box_products" onClick={() => setCategory("crockery")}>
          <FaUtensils className="category_icon_products" />Crockery
        </div>
      </div>

      <ProductSection />

      <Footer />
    </div>
  );
};

export default Products;
