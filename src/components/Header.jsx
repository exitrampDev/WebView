import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signIcon from "../assets/signIcon.png";

// Example icons (replace with your own)
import BuyerIcon from "../assets/buyerIcon.png";
import SellerIcon from "../assets/sellerIcon.png";
import MnaIcon from "../assets/mnaIcon.png";
import SubsIcon from "../assets/subsIcon.png";

const popupOptions = [
  {
    icon: BuyerIcon,
    title: "I'm a Buyer",
    description: "Browse listings, submit NDAs, and connect with sellers.",
  },
  {
    icon: SellerIcon,
    title: "I'm a Seller",
    description: "List your business and manage interest from serious buyers.",
  },
  {
    icon: MnaIcon,
    title: "I'm an M&A Expert",
    description: "Showcase your expertise and help sellers close strong deals.",
  },
  {
    icon: SubsIcon,
    title: "I Just Want Updates",
    description: "Sign up for insights and M&A market news.",
  },
];

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDivClick = (index) => {
    console.log(`You clicked on: ${popupOptions[index].title}`);
    // You can add route change, modal, or anything else here
  };

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
          <button onClick={() => setShowPopup(true)}>
            Sign Up <img src={signIcon} alt="signIcon" />
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup_overlay" onClick={() => setShowPopup(false)}>
          <div
            className="popup_modal_signup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Choose Your Account Type</h3>
            <p>Select how you’d like to use Exit Ramp.</p>
            <div className="popup_options">
              {popupOptions.map((item, index) => (
                <div
                  key={index}
                  className="popup_option"
                  onClick={() => handleDivClick(index)}
                >
                  <div className="popup__content_block">
                    <img
                      src={item.icon}
                      alt={`icon-${index}`}
                      className="popup_icon"
                    />
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="login__content">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
