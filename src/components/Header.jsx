import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signIcon from "../assets/signIcon.png";

const Header = () => {
  return (
    <header>
      <div className="header_container">
        {/* Logo */}
        <div className="logo_col">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="nav_col">
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/aboutus">About Us</Link>
        </nav>

        {/* Signup Button */}
        <div className="signup_content">
          <button>
            Sign Up <img src={signIcon} alt="signIcon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
