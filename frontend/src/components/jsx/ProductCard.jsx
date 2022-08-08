import React, { useEffect, useState } from "react";
// import P1 from "../../images/products/f1.jpg";
import "../css/ProductCardStyles.css";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai"

import axios from "axios"
import { useNavigate } from "react-router-dom";

const ProductCard = () => {

  const [product,setProduct] = useState([])

  const navigate = useNavigate()
  
  const addToCart = async(p_id)=>{

    const {data} = await axios.post(`http://localhost:5000/product/addtocart/${p_id}`,{},{
     withCredentials:true
    })  
    
 }

  useEffect(()=>{ 
    const getproduct = async()=>{
      axios.get(`http://localhost:5000/product/getallproducts`).then(({data})=>{
        setProduct(data)
      })
    }
    getproduct()

  }, [addToCart])


 




  return (
  <div className="product_details">
    {
      product.map((prod)=>(  
                  <div className="product_container_productcard" key={prod._id}>
            <img  className='imagesproduct' src={`http://localhost:5000/product/images/${prod.imageId}`} alt="" onClick={()=>{navigate(`/singleproduct/${prod._id}/${prod.imageId}`)}}/>
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
           <AiOutlineShoppingCart className="cart_icon_productcard" onClick={()=>addToCart(prod._id)}/>
         </div>
        </div>
          )) 
        }
        </div>
  );
};

export default ProductCard;
