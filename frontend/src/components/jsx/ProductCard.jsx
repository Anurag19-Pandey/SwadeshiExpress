import React from "react";
import P1 from "../../images/products/f1.jpg";
import "../css/ProductCardStyles.css";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai"

const ProductCard = () => {
  return (
    <div className="product_container_productcard">
      <img src={P1} />
      <div className="description_productcard">
        <span>Clothing</span>
        <h5>Cartoon Astronaut T-Shirt</h5>
        <div className="star_section_productcard">
          <AiFillStar className="rating_icon_productcard"/>
          <AiFillStar className="rating_icon_productcard"/>
          <AiFillStar className="rating_icon_productcard"/>
          <AiFillStar className="rating_icon_productcard"/>
          <AiFillStar className="rating_icon_productcard"/>
        </div>
        <h4>&#x20B9;  78</h4>
      </div>
      <div className="cart_icon_container_productcard">
        <AiOutlineShoppingCart className="cart_icon_productcard" />
      </div>
    </div>
  );
};

export default ProductCard;
