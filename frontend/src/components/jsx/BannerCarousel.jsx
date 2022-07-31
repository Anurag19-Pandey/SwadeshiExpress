import React, { useState, useEffect } from "react";
import "../css/ProductsStyles.css";
import Banner1 from "../../images/banner/sales1.jpg";
import Banner2 from "../../images/banner/sales2.png";
import Banner3 from "../../images/banner/sales3.png";
import { BsArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

let count = 0;

const BannerCarousel = () => {
  const featuredProducts = [Banner1, Banner2, Banner3];

  useEffect(() => {
    // startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="bannercarousel">
      <div className="button_container_bannercarousel">
        <BsArrowLeftCircleFill onClick={handleOnPrevClick} className="button_icon_bannercarousel" />
      </div>

      <div className="image_container_bannercarousel">
        <img src={featuredProducts[currentIndex]} alt="sales" />
      </div>

      <div className="button_container_bannercarousel">
        <BsFillArrowRightCircleFill onClick={handleOnNextClick} className="button_icon_bannercarousel" />
      </div>
    </div>
  );
};

export default BannerCarousel;
