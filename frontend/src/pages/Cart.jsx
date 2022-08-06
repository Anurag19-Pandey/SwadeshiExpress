import React, { useState, useEffect } from "react";
import HomeHeader from "../components/jsx/HomeHeader";
import "../components/css/CartStyles.css";
import Img1 from "../images/products/f1.jpg";
import EmptyCart from "../images/emptyCart.svg";
import { Link } from "react-router-dom";
import Footer from "../components/jsx/Footer";
import ProductSection from "../components/jsx/ProductSection";

const Cart = () => {
    const [isContent, setIsContent] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [education, setEducation] = useState({
    flat: "",
    street: "",
    city: ""
  });

  const [studentedu,setStudentedu] = useState([])

  const handleForm = (e) => {
    const {name, value} = e.target;
    setEducation({
      ...education,
      [name]: value
    })
    
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(education));
    setIsSubmit(true);
    setIsModal(!isModal);
  }

  useEffect(() => {
    if( Object.keys(formErrors).length === 0 && isSubmit ){
     console.log("done")
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if(!values.flat){
      errors.flat = "Name required";
    }

    if(!values.street){
      errors.street = "Street name required";
    }

    if(!values.city){
      errors.city = "City name required";
    }

    return errors;
  }


  return (
    <div>
      <HomeHeader />

      <div className="cart_section">
        {isContent ? 
        (
            <div className="empty_cart_container_cart">
                <h3>Empty Cart</h3>
                <img src={EmptyCart} alt="empty" />
                <h2>Add Items to your cart</h2>
            </div>
        ) 
        : (
            <div className="products_cart_container_cart">
            <div className="top_products_section_cart">
              <h1>Shopping Cart</h1>
              <p>Price</p>
            </div>
            <div className="middle_products_section_cart">
              <div className="line_cart"></div>
              <div className="product_detail_section_cart">
                <div className="left_product_detail_cart">
                  <img src={Img1} alt="product" />
                </div>
                <div className="products_info_cart">
                  <div className="top_products_info_cart">
                    <h2>Nike | Summer T-Shirt</h2>
                    <h3>&#8377; 1,800</h3>
                  </div>
                  <div className="middle_products_info_cart">
                    <h3>Clothing</h3>
                    <p>In Stock</p>
                  </div>
                  <div className="bottom_products_info_cart">
                    <div className="input_products_info_cart">
                      <label>Qty</label>
                      <input type="number" defaultValue={1} min="1" />
                    </div>
                    <div className="line_products_cart"></div>
                    <button className="delete_btn_products_info">Delete</button>
                  </div>
                  <div className="end_section_products_info_cart">
                    <Link to="/">See more details ...</Link>
                  </div>
                </div>
              </div>
  
              <div className="line_cart"></div>
              <div className="product_detail_section_cart">
                <div className="left_product_detail_cart">
                  <img src={Img1} alt="product" />
                </div>
                <div className="products_info_cart">
                  <div className="top_products_info_cart">
                    <h2>Nike | Summer T-Shirt</h2>
                    <h3>&#8377; 1,800</h3>
                  </div>
                  <div className="middle_products_info_cart">
                    <h3>Clothing</h3>
                    <p>In Stock</p>
                  </div>
                  <div className="bottom_products_info_cart">
                    <div className="input_products_info_cart">
                      <label>Qty</label>
                      <input type="number" defaultValue={1} min="1" />
                    </div>
                    <div className="line_products_cart"></div>
                    <button className="delete_btn_products_info">Delete</button>
                  </div>
                  <div className="end_section_products_info_cart">
                    <Link to="/">See more details ...</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom_detail_section_cart">
              <div className="line_cart"></div>
              <h3>
                Subtotal (2 items) : <span>&#8377; 2,000</span>
              </h3>
              <div>
                  <button className="pay_btn_cart" onClick={() => setIsModal(!isModal)}>Proceed to Pay</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModal && (
          <div className='modal_backgound_cart'>
          <div className='modal_container_cart'>
            <div className='modal_top_section_cart'>
              <h2>Delivery Details</h2>
            </div>
            
   
            <div className='modal_mid_section_cart'>
              <form>
                <div className="form_box_cart">
                  <label>Flat No.</label>
                  <input type="text" name="flat" placeholder="Enter flat number" onChange={handleForm} />
                  <p className="errors_msg_cart">{formErrors.flat}</p>
                </div>

                <div className="form_box_cart">
                  <label>Street Name</label>
                  <input type="text" name="street" placeholder="Enter your street name" onChange={handleForm} />
                  <p className="errors_msg_cart">{formErrors.street}</p>
                </div>

                <div className="form_box_cart">
                  <label>City</label>
                  <input type="text" name="city" placeholder="Enter your city" onChange={handleForm} />
                  <p className="errors_msg_cart">{formErrors.city}</p>
                </div>

                <div className='modal_bottom_section_cart'>
                  <button className='primary_btn_cart' onClick={() => setIsModal(!isModal)}>Cancel</button>
                  <button type='submit' onClick={submitForm} className='secondary_btn_cart'>Save Details</button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
        )}

      <ProductSection />

      <Footer />
    </div>
  );
};

export default Cart;
