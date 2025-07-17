import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import signIcon from "../assets/signIcon.png";

const Header = () => {
  return (
    <header>
      <div className="header_container">
        {/* Logo */}
        <div className="logo_col">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="nav_col">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Listings
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact Us
          </NavLink>
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
