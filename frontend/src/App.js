import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
<<<<<<< HEAD
        <Route path="/sellerdashboard" element={<SellerDashboard/>}/>
=======
        <Route path="/products" element={<Products />} />
>>>>>>> 6567767cc1ed577fff384ea45433c9c1cad7ee26
      </Routes>
    </BrowserRouter>
  );
};

export default App;
