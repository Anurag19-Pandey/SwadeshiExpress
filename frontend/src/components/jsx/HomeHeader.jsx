import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/HomeHeaderStyles.css";
import { FaTimes, FaBars } from "react-icons/fa";

const HomeHeader = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="homeheader">
      <div className="left_section_homeheader">
        <div className="logo_container_homeheader">
          <Link to="/">Swadeshi Express</Link>
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
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">Products</Link>
            </li>
          </ul>

          <button className="primary_btn_homeheader"><Link to="/signupseller">Add Your Products</Link></button>
        </div>
      </div>

      <div className="hamburger_homeheader">
        {click ? (<FaTimes size={20} className="hamburger_icon_homeheader" onClick={handleClick} />) : (<FaBars size={20} className="hamburger_icon_homeheader" onClick={handleClick} />)}
      </div>
    </div>
  );
};

export default HomeHeader;
