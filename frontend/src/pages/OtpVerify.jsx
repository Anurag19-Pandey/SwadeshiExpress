import React, { useState, useEffect} from 'react'
import HomeHeader from '../components/jsx/HomeHeader';
import OTPVerifyLogo from "../images/otpverify-image.png";
import InstaLogo from "../images/instagram-logo.svg";
import LinkedinLogo from "../images/linkedin-logo.svg";
import YoutubeLogo from "../images/youtube-logo.svg";
import axios from 'axios'
// import GoogleLogo from "../images/google-logo.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { Link, useNavigate,useParams } from 'react-router-dom';
import "../components/css/EmailOtpVerifyStyles.css"

const OtpVerify = () => {
    const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate()

  const {email} = useParams()
  const [otp, setOtp] = useState({
    email: email,
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: ""
  });


// const [sendDetails,setSendDetails] = useState({})



  const handleForm = (e) => {
    const {name, value} = e.target;
    setOtp({
      ...otp,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(otp));
    setIsSubmit(true);
  }

  useEffect(() => {
    if( Object.keys(formErrors).length === 0 && isSubmit ){
        axios.post("http://localhost:5000/verifyotp",{
         ...otp
        }).then(({data})=>{
          if(data.message === "success")
          {
            navigate('/login')
          }
        })
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
            <h2>Find Your Dream P !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_emailOtp">
            <img src={OTPVerifyLogo} alt="Sign Up" />
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
              <Link to="/signupotp">Create an account</Link>
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
                  <input type="text" name="email" placeholder="Your Email Address" value={otp.email}/>
                  <p className="errors-msg">{formErrors.email}</p>
                </div>

                <div className="form-container-box_emailOtp">
                  <label>Enter OTP</label>
                  <div className="otp-field_emailOtp">
                    <input type="text" maxLength="1" name="otp1" value={otp.otp1} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp2" value={otp.otp2} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp3" value={otp.otp3} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp4" value={otp.otp4} onChange={handleForm} />
                  </div>
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

export default OtpVerify
