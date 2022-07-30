import React from "react";
import HomeHeader from "../components/jsx/HomeHeader";
import "../components/css/ContactStyles.css";
import Img1 from "../images/features/1.png";
import Img2 from "../images/features/2.png";
import Img3 from "../images/features/3.png";
import Footer from "../components/jsx/Footer";
import { ImLocation2 } from "react-icons/im";
import { FaRegEnvelope } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { FiClock } from "react-icons/fi";

const Contact = () => {
  return (
    <div>
      <HomeHeader />

      <section id="head-banner">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      <section id="contact-details">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit One of our agency locations or contact us today</h2>
          <h3>Head Office</h3>

          <div>
            <li>
              <ImLocation2 className="details_icon_contact" />
              <p>56 Glassford Street Glasgow G1 1UL New York</p>
            </li>
            <li>
              <FaRegEnvelope className="details_icon_contact" />
              <p>contact@example.com</p>
            </li>
            <li>
              <BiPhoneCall className="details_icon_contact" />
              <p>+91 9876543210</p>
            </li>
            <li>
              <FiClock className="details_icon_contact" />
              <p>Monday to Saturday - 9:00a.m. to 5:00p.m.</p>
            </li>
          </div>
        </div>

        <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112067.8833256858!2d76.92222067476337!3d28.6261248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0363c4edf747%3A0x240c75aa3d09de7a!2sPacific%20Mall%20Tagore%20Garden!5e0!3m2!1sen!2sin!4v1659082979836!5m2!1sen!2sin" style={{border: "0"}} width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      <section className="form-details">
        <form>
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear your message!</h2>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Subject" />
          <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
          <button>Submit</button>
        </form>

        <div className="people">
          <div>
            <img src={Img1} />
            <p>
              <span>John Doe</span> Senior Marketing Manager <br></br> Phone: +000 123 000 <br></br>
              77 88 Email: contact@example.com
            </p>
          </div>
          <div>
            <img src={Img2} />
            <p>
              <span>William Smith</span> Senior Marketing Manager <br></br> Phone: +000
              123 000 77 88 <br></br> Email: contact@example.com
            </p>
          </div>
          <div>
            <img src={Img3} />
            <p>
              <span>Emma Stone</span> Senior Marketing Manager <br></br> Phone: +000 123
              000 77 88 <br></br> Email: contact@example.com
            </p>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="newstext">
          <h4>Sign Up for Newsletters</h4>
          <p>
            Get E-mail updates about our latest shop and{" "}
            <span>special offers.</span>
          </p>
        </div>

        <div className="form">
          <input type="text" placeholder="Your email addresss" />
          <button>Sign Up</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
