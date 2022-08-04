import React from 'react';
import "../css/ProductCardStyles.css";
// import ProductCard from './ProductCard';
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import '../css/ProductCategoryStyles.css'
const ProductCategory = ({product}) => {

    const navigate = useNavigate()
    
  return (
    <div className='productcategory'>
      <h1 className='heading_product'>Our Products</h1>
      <div className='products_section_productCategory'>
      {
            product.map((prod)=>(     
                <div className="product_container_productcard" key={prod._id} onClick={()=>{navigate(`/singleproduct/${prod._id}/${prod.imageId}`)}}>
                    <img  className='imagesproduct' src={`http://localhost:5000/product/images/${prod.imageId}`} alt="" />
                   <div className="description_productcard">
                   <span>{prod.category}</span>
                   <h5>{prod.productname}</h5>
                   <span>{prod.description}</span>
                   <div className="star_section_productcard">
                     <AiFillStar className="rating_icon_productcard"/>
                     <AiFillStar className="rating_icon_productcard"/>
                     <AiFillStar className="rating_icon_productcard"/>
                     <AiFillStar className="rating_icon_productcard"/>
                     <AiFillStar className="rating_icon_productcard"/>
                   </div>
                   <h4>&#x20B9;  {prod.price}</h4>
                 </div>
                 <div className="cart_icon_container_productcard">
                   <AiOutlineShoppingCart className="cart_icon_productcard" />
                 </div>
                </div>
            ))
        }
        
      </div>
    </div>
  )
}

export default ProductCategory;
