import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUS from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
