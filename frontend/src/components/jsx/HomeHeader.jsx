import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/HomeHeaderStyles.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from 'axios'
import { useCookies } from "react-cookie";

const HomeHeader = ({id,cartlength}) => {
  const navigate = useNavigate();
const [lengthofCart,setLengthofCart] = useState("0");
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(()=>{
    const productInCart=()=>{
     axios.get(`http://localhost:5000/product/getaddtocart/${id}`).then(({data})=>{
      setLengthofCart(data.length)
     })
     }
    productInCart()
  },[])

  return (
    <div className="homeheader">
      <div className="left_section_homeheader">
        <div className="logo_container_homeheader">
          <div>
          <Link to="/">Swadeshi Express</Link>
          </div>

          <Link to={`/cart/${id}`}> 
          <div className="cart_container_homeheader">
            <div className="cart_no_homeheader">{cartlength != 0 ? cartlength:lengthofCart}</div>
           <AiOutlineShoppingCart className="cart_icon_homeheader" />
          </div>
          </Link>
  
        </div>
      </div>

      <div className={click ? "right_section_homeheader active_homeheader" : "right_section_homeheader"}>
        <div className="nav_items_homeheader">
        <FaTimes size={20} className="hamburger_icon2_homeheader" onClick={handleClick} />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>

          <div className="button_container_homeheader">
            <button className="secondary_btn_homeheader" onClick={() => navigate("/signupuser")}>Sign Up</button>
            <button className="primary_btn_homeheader" onClick={() => navigate("/signupseller")}>Add Your Products</button>
          </div>

        </div>
      </div>

      <div className="hamburger_homeheader">
        {click ? (<FaTimes size={20} className="hamburger_icon_homeheader" onClick={handleClick} />) : (<FaBars size={20} className="hamburger_icon_homeheader" onClick={handleClick} />)}
      </div>
    </div>
  );
};

export default HomeHeader;
