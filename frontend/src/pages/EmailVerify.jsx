 import React, { useState, useEffect } from 'react'
import HomeHeader from '../components/jsx/HomeHeader';
import EmailVerifyLogo from "../images/emailverify-image.png";
import InstaLogo from "../images/instagram-logo.svg";
import LinkedinLogo from "../images/linkedin-logo.svg";
import YoutubeLogo from "../images/youtube-logo.svg";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from 'react-router-dom';
import "../components/css/EmailOtpVerifyStyles.css"

const EmailVerify = () => {
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  

    const navigate = useNavigate()

    const [user, setUser] = useState({
      email: ""
    });
  
    const handleForm = (e) => {
      const {name, value} = e.target;
      setUser({
         ...user,
        [name]: value
      })
    }
  
    const submitForm = (e) => {
      e.preventDefault();
      setFormErrors(validate(user));
      setIsSubmit(true);
    }
  
    useEffect(() => {
      if( Object.keys(formErrors).length === 0 && isSubmit ){
         axios.post("http://localhost:5000/seller/verifyemail",{
            ...user
         }).then(({data})=>{
            if(data){
               navigate(`/otpverify/${data.email}`)
            }
         })
      }else{
        console.log("error")
      }
    }, [formErrors]);
  
    const validate = (values) => {
      const errors = {};
      const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if(!values.email){
        errors.email = "Email required";
      }else if(!regex.test(values.email)){
        errors.email = "Incorrect Email Format";
      }
  
      return errors;
    }

  return (
    <div>
      <HomeHeader />

      <div className="main_emailOtp">
        <div className="left-part_emailOtp">
          <div className="top_emailOtp">
            <h2>Find Your Dream Job !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_emailOtp">
            <img src={EmailVerifyLogo} alt="Email Verify" />
          </div>

          <div className="social_emailOtp">
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_emailOtp">
          <div className="form-container_emailOtp">
            <div className="top_emailOtp">
              <h2>Verify Your Email Id</h2>
              <Link to="/signupuser">Create an account</Link>
            </div>

            <div className="line_emailOtp"></div>

            <div className="main-error-msg_emailOtp">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_emailOtp">
              <form>
                <div className="form-full_emailOtp">
                <div className="form-container-box_emailOtp">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg">{formErrors.email}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-button_emailOtp">
                  Verify Email
                  <BsArrowRightShort size={27} className="create-btn-logo_emailOtp" />
                </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
