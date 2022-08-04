import React, { useEffect, useState } from 'react';
import HomeHeader from '../components/jsx/HomeHeader';
import SignUpLogo from "../images/signup-image.png";
import InstaLogo from "../images/instagram-logo.svg";
import LinkedinLogo from "../images/linkedin-logo.svg";
import YoutubeLogo from "../images/youtube-logo.svg";
import GoogleLogo from "../images/google-logo.svg";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from 'react-router-dom';
import "../components/css/SignUpSellerStyles.css"

const SignUpSeller = () => {

  const navigate = useNavigate()



  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const [seller, setSeller] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    productType: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setSeller({
      ...seller,
      [name]: value
    })
    console.log(name,value)
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(seller));
    setIsSubmit(true);
  }

  useEffect(() => {
    if( Object.keys(formErrors).length === 0 && isSubmit ){
     axios.post("http://localhost:5000/seller/register",{
          ...seller
      }).then(({data})=>{
        if(data.message === "success"){
          navigate('/emailverify')
        }
      })
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.name){
      errors.name = "Name required";
    }else if(values.name.length < 2){
      errors.name = "Minimum 2 characters required";
    }

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect email format";
    }

    if(!values.password){
      errors.password = "Password required";
    }else if(values.password.length < 6){
      errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
      errors.password = "Max 12 characters allowed";
    }

    if(!values.confirmpassword){
      errors.confirmpassword = "Confirm Password required";
    }else if(values.confirmpassword !== values.password){
      errors.confirmpassword = "Confirm password didn't match password";
    }

    if(!values.phoneno){
      errors.phoneno = "Phone number required"
    }else if(values.phoneno.length !== 10){
      errors.phoneno = "Phone number is Invalid";
    }

    if(!values.productType){
        errors.productType = "Product type required"
    }

    if(!checkboxCheck){
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  }

  return (
    <div>
      <HomeHeader />

      <div className="main_signupseller">
        <div className="left-part_signupseller">
          <div className="top_signupseller">
            <h2>Find Your Dream Job !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signupseller-banner_signupseller">
            <img src={SignUpLogo} alt="Sign Up" />
          </div>

          <div className="social_signupseller">
            <div className="social-logo_signupseller">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_signupseller">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_signupseller">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_signupseller">
          <div className="form-container_signupseller">
            <div className="top_signupseller">
              <h2>Create Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signupseller"></div>

            {formErrors.final && (
              <div className="main-msg_signupseller">
              <p>{formErrors.final}</p>
            </div>
            )}

            <div className="mid-part_signupseller">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signupseller">
                <div className="form-box_signupseller box1_signupseller">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" value={seller.name} onChange={handleForm} />
                  <p className="errors-msg_signupseller">{formErrors.name}</p>
                </div>

                <div className="form-box_signupseller box2_signupseller">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={seller.email} onChange={handleForm} />
                  <p className="errors-msg_signupseller">{formErrors.email}</p>
                </div>

                <div className="form-box_signupseller box3_signupseller">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Enter Password" value={seller.password} onChange={handleForm} />
                  <p className="errors-msg_signupseller">{formErrors.password}</p>
                </div>

                <div className="form-box_signupseller box4_signupseller">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" placeholder="Confirm Password" value={seller.confirmpassword} onChange={handleForm} />
                  <p className="errors-msg_signupseller">{formErrors.confirmpassword}</p>
                </div>

                <div className="form-box_signupseller box5_signupseller">
                  <label style={{paddingBottom: "5px"}}>Phone Number</label>
                  <input type="text" name="phoneno" placeholder="Your phone number" value={seller.phoneno} onChange={handleForm} />
                  <p className="errors-msg_signupseller">{formErrors.phoneno}</p>
                </div>

                <div className="form-box_signupseller box7_signupseller">
                  <label style={{paddingBottom: "5px"}}>Select type of products to add -</label>
                  <div>
                    <input type="radio" name="productType" value="clothes" className='input_box7_signupseller' onChange={handleForm} /> Clothing
                  </div>
                  <div>
                    <input type="radio" name="productType" value="furniture" className='input_box7_signupseller' onChange={handleForm} /> Furniture
                  </div>
                  <div>
                  <input type="radio" name="productType" value="crockery" className='input_box7_signupseller' onChange={handleForm} /> Crockery
                  </div>
                  <p className="errors-msg_signupseller">{formErrors.productType}</p>
                </div>

                <div className="box6_signupseller">
                  <div>
                  <input type="checkbox" id="cb1" onClick={() => setCheckboxCheck(!checkboxCheck)} />
                  <label htmlFor="cb1"></label>
                  <p>I agree to <a href="youtube.com">Terms and Conditions</a></p>
                  </div>
                  <p className="errors-msg_signupseller">{formErrors.checkbox}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_signupseller">
                  Create New Account
                  <BsArrowRightShort size={27} className="create-btn-logo_signupseller" />
                </button> 

                <a className="google-btn_signupseller" href="youtube.com">
                <img src={GoogleLogo} alt="" />
                  Signup with Google
                </a> 
              </form>

              <div className="line_signupseller"></div>

              <div className="bottom-part_signupseller">
                <p>Have an account ? </p>
                <Link to="/login">&nbsp;Login Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSeller;
