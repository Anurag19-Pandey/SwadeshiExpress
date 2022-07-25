import React from "react";
import HomeBanner1 from "../components/jsx/HomeBanner1";
import HomeHeader from "../components/jsx/HomeHeader";
import "../components/css/HomeStyles.css";
import F1 from "../images/features/f1.png";
import F2 from "../images/features/f2.png";
import F3 from "../images/features/f3.png";
import F4 from "../images/features/f4.png";
import F5 from "../images/features/f5.png";
import F6 from "../images/features/f6.png";
import ProductSection from "../components/jsx/ProductSection";

const features = [
  {
    feature: "Free shipping",
    image: F1,
  },
  {
    feature: "Online Order",
    image: F2,
  },
  {
    feature: "Save Money",
    image: F3,
  },
  {
    feature: "Promotions",
    image: F4,
  },
  {
    feature: "Happy Sell",
    image: F5,
  },
  {
    feature: "24/7 Support",
    image: F6,
  },
];

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <HomeBanner1 />
      <div className="feature_container_home">
        <h1>What we offer ?</h1>
        <div className="feature_home">
          {features.map((val) => (
            <div key={val.feature} className="feature_box_home">
              <img src={val.image} alt="FREE SHIPPING" />
              <h6>{val.feature}</h6>
            </div>
          ))}
        </div>
      </div>

      <ProductSection />
    </div>
  );
};

export default Home;
