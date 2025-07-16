import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUS from "./pages/AboutUS";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/aboutus" element={<AboutUS />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
