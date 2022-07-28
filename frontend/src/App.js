import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import SignUpSeller from "./pages/SignUpSeller";
import SignUpUser from "./pages/SignUpUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signupuser" element={<SignUpUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/otpverify/:email" element={<OtpVerify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signupseller" element={<SignUpSeller />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
