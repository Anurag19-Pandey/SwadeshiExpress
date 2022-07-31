import React,{useState,useEffect} from 'react'
import Footer from '../components/jsx/Footer';
import HomeHeader from '../components/jsx/HomeHeader';
import "../components/css/SingleProductStyles.css";
import Img1 from "../images/products/f1.jpg"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import axios from "axios"

const SingleProduct = () => {

	const [product,setProduct] = useState({})
	const {id,imageid} = useParams()

useEffect(()=>{

		axios.get(`http://localhost:5000/product/getproduct/${id}`).then(({data})=>{
			setProduct(data)		
		 })
 },[])

  return (
    <div>
      <HomeHeader />
      <section id="prodetails_singleproduct" className='section-p1_singleproduct'>
		<div className="single-product-image_singleproduct">
			<img src={`http://localhost:5000/product/images/${imageid}`} alt="Our Product" style={{width: "100%"}} id="MainImg" />
		</div>
		
		<div className="single-product-details_singleproduct">
			<h5>Category / {product.category}</h5>
			<h4>{product.productname}</h4>
			<h2>&#x20B9; {product.price}</h2>
			<select>
				<option>{product.size}</option>
				<option>Small</option>
				<option>Medium</option>
				<option>Large</option>
				<option>XL</option>
				<option>XXL</option>
			</select>
			<div className='details_cart_singleproduct'>
			<input type="number" defaultValue={1} min="1" max={product.quantity}/>
			<button>Add To Cart <AiOutlineShoppingCart size={16} /></button>
			</div>
			<h4>Product Details</h4>
			<br></br>
			<span>{product.description}</span>
		</div>
	</section>

    <Footer />
    </div>
  )
}

export default SingleProduct;
