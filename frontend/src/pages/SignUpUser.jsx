import React, { useEffect, useState } from 'react';
import HomeHeader from '../components/jsx/HomeHeader';
import SignUpLogo from "../images/signup-image.png";
import InstaLogo from "../images/instagram-logo.svg";
import LinkedinLogo from "../images/linkedin-logo.svg";
import YoutubeLogo from "../images/youtube-logo.svg";
import GoogleLogo from "../images/google-logo.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from 'react-router-dom';
import "../components/css/SignUpUserStyles.css"

const SignUpUser = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobile: "",
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
      console.log("submitted")
    }else {
        console.log("errors")
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
      errors.email = "Incorrect Email Format";
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

    if(!values.mobile){
      errors.mobile = "Mobile number required"
    }else if(values.mobile.length !== 10){
      errors.mobile = "Mobile number is Invalid";
    }

    if(!checkboxCheck){
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  }

  return (
    <div>
      <HomeHeader />

      <div className="main_signupuser">
        <div className="left-part_signupuser">
          <div className="top_signupuser">
            <h2>Find Your Dream Job !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signupuser-banner_signupuser">
            <img src={SignUpLogo} alt="Sign Up" />
          </div>

          <div className="social_signupuser">
            <div className="social-logo_signupuser">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_signupuser">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_signupuser">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_signupuser">
          <div className="form-container_signupuser">
            <div className="top_signupuser">
              <h2>Create Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signupuser"></div>

            <div className="main-msg_signupuser">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_signupuser">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signupuser">
                <div className="form-box_signupuser box1_signupuser">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" value={user.name} onChange={handleForm} />
                  <p className="errors-msg_signupuser">{formErrors.name}</p>
                </div>

                <div className="form-box_signupuser box2_signupuser">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_signupuser">{formErrors.email}</p>
                </div>

                <div className="form-box_signupuser box3_signupuser">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  <p className="errors-msg_signupuser">{formErrors.password}</p>
                </div>

                <div className="form-box_signupuser box4_signupuser">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" placeholder="Confirm Password" value={user.confirmpassword} onChange={handleForm} />
                  <p className="errors-msg_signupuser">{formErrors.confirmpassword}</p>
                </div>

                <div className="form-box_signupuser box5_signupuser">
                  <label style={{paddingBottom: "5px"}}>Mobile Number</label>
                  <input type="text" name="mobile" placeholder="Your mobile number" value={user.mobile} onChange={handleForm} />
                  <p className="errors-msg_signupuser">{formErrors.mobile}</p>
                </div>

                <div className="box6_signupuser">
                  <div>
                  <input type="checkbox" id="cb1" onClick={() => setCheckboxCheck(!checkboxCheck)} />
                  <label for="cb1"></label>
                  <p>I agree to <a href="youtube.com">Terms and Conditions</a></p>
                  </div>
                  <p className="errors-msg_signupuser">{formErrors.checkbox}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_signupuser">
                  Create New Account
                  <BsArrowRightShort size={27} className="create-btn-logo_signupuser" />
                </button> 

                <a className="google-btn_signupuser" href="youtube.com">
                <img src={GoogleLogo} alt="" />
                  Signup with Google
                </a> 
              </form>

              <div className="line_signupuser"></div>

              <div className="bottom-part_signupuser">
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

export default SignUpUser;
