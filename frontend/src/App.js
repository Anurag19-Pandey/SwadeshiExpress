import React from "react";
import { BrowserRouter, Route, Routes,useNavigate } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import SellerDashboard from "./pages/SellerDashboard";
import SignUpSeller from "./pages/SignUpSeller";
import SignUpUser from "./pages/SignUpUser";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id/:imageid" element={<SingleProduct />} />
        <Route path="/signupuser" element={<SignUpUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/otpverify/:email" element={<OtpVerify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signupseller" element={<SignUpSeller />} />
        <Route path="/sellerdashboard" element={<SellerDashboard/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/sellerdashboard/:id" element={<SellerDashboard/>}/>
        <Route path="/products" element={<Products />} />
<<<<<<< HEAD
        <Route path="/cart/:id" element={<Cart />} />
=======
        <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
=======
>>>>>>> 371822eb504570949831838139c0570e1b41e5a9
>>>>>>> 8032c07fb0f0325331c8c8fe02829548dd47a0fa
>>>>>>> 6bfbaf54cbc1fc72a98bfa5311b7006ce4de5c86
      </Routes>
    </BrowserRouter>
  );
};

export default App;
