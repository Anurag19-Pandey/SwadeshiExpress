import React from 'react';
import { Link } from "react-router-dom";
import "../css/HomeBanner1Styles.css"

const HomeBanner1 = () => {

  return (
    <div className="homebanner1">
      <div className="text_container_homebanner1">
        <div className="logo_container_homebanner1">
            <h1>Swadeshi <span>Express</span></h1>
        </div>
        <div className="banner_details_homebanner1">
            <h2>Empowering Indian Artisans selling handcrafted products</h2>
            <Link to="/" className='banner_button_homebanner1'>Shop Now</Link>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner1;