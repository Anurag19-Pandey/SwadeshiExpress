import React from 'react'
import Header from "../components/jsx/HomeHeader"
import "../components/css/SellerDashboardStyles.css"
// import Product from "../components/jsx/ProductCard"
import ProductCard from '../components/jsx/ProductCard'
import Footer from "../components/jsx/Footer"

const SellerDashboard = () => {
  return (
      <div className='SellerDashboard'>
        <Header/>
        <div className="Seller_info_Seller">
            <div className="Seller_info_image">
                <img src="https://pbs.twimg.com/media/E2JJMJsVIAE9Aq4.jpg:large" alt="Selle" />
            </div>
            <div className="Seller_info">
                <div className="Seller_info_name">
                    Jay Shankar Gupta
                </div>
                <div className="Seller_info_location">
                President's Inaugural speech. 123 Main Street, New York, NY 10030
                </div>
                <div className="Seller_info_contacts">
                   <button className="Seller_info_Contact">9995657865</button>
                   <button className="Seller_info_Contact">9995657865</button>
                </div>
            </div>
        </div>

        <div className="Seller_Products">
            <div className="Seller_Heading">
                Procucts
            </div>
            <div className="seller_by">by Jay Shankar Gupta.</div>

            <div className="Product_wrapper_seller">
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
               <ProductCard/>
            </div>
        </div>
        <div className="Seller_Product_post">
            <div className='Seller_product_post_head'> Post Product </div> 
            <div className="Seller_Post_preview">
                <ProductCard/>
            </div>
            <form action="" className='Seller_Postform'>
                <label>Name</label>
                <input type="text" id='Name' placeholder='Product Name' />
                <label>Category</label>
                <select name="category" id="size">
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Crokery">Crokery</option>
                </select>
                <label>Desctiption</label>
                <input type="text" placeholder='Description' />
                <label>Price</label>
                <input type="number" placeholder='Price'/>
                <label>Size</label>
                <select name="size" id="size" placeholder='Size' defaultValue="null">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <label>Quantity</label>
                <input type="number" placeholder='Quantity'/>
                <label>Image</label>
                <input type="file" />
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default SellerDashboard