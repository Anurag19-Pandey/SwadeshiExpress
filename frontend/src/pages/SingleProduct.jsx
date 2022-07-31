import React from 'react'
import Footer from '../components/jsx/Footer';
import HomeHeader from '../components/jsx/HomeHeader';
import "../components/css/SingleProductStyles.css";
import Img1 from "../images/products/f1.jpg"
import { AiOutlineShoppingCart } from 'react-icons/ai';


const SingleProduct = () => {
  return (
    <div>
      <HomeHeader />

      <section id="prodetails_singleproduct" className='section-p1_singleproduct'>
		<div className="single-product-image_singleproduct">
			<img src={Img1} alt="Our 1st Product" style={{width: "100%"}} id="MainImg" />
		</div>
		
		<div className="single-product-details_singleproduct">
			<h6>Home / T-Shirt</h6>
			<h4>Men's Fashion T-Shirt</h4>
			<h2>$78.00</h2>
			<select>
				<option>Select Option</option>
				<option>Small</option>
				<option>Medium</option>
				<option>Large</option>
				<option>XL</option>
				<option>XXL</option>
			</select>
			<div className='details_cart_singleproduct'>
			<input type="number" value="1" />
			<button>Add To Cart <AiOutlineShoppingCart size={16} /></button>
			</div>
			<h4>Product Details</h4>
			<br></br>
			<span>The Gildan Ultra Cotton T-Shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
		</div>
	</section>

    <Footer />
    </div>
  )
}

export default SingleProduct;
