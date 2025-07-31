import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import SignupPopup from "./SignupPopup";

import logo from "../assets/logo.png";
import signIcon from "../assets/signIcon.png";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const openPopup = () => {
    setPopupStep(1);
    setSelectedRole(null);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupStep(1);
    setSelectedRole(null);
  };

  const handleRoleSelect = (roleKey) => {
    if (roleKey === "ma_expert" || roleKey === "Subscriber") {
      closePopup();
      navigate("/register", {
        state: { role: roleKey },
      });
    } else {
      setSelectedRole(roleKey);
      setPopupStep(2);
    }
  };

  const handlePlanSelect = (roleKey) => {
    closePopup();
    navigate("/register", {
      state: { role: roleKey },
    });
  };

  const navItems = [
    {
      label: "Home",
      command: () => navigate("/"),
      className: currentPath === "/" ? "p-menuitem-active" : "",
    },
    {
      label: "Listings",
      command: () => navigate("/listings"),
      className: currentPath.startsWith("/listings") ? "p-menuitem-active" : "",
    },
    {
      label: "About Us",
      command: () => navigate("/aboutus"),
      className: currentPath === "/aboutus" ? "p-menuitem-active" : "",
    },
    {
      label: "Contact Us",
      command: () => navigate("/contactus"),
      className: currentPath === "/contactus" ? "p-menuitem-active" : "",
    },
  ];
  const start = (
    <div className="logo_col">
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
    </div>
  );

  const end = (
    <button onClick={openPopup}>
      Sign Up <img src={signIcon} alt="signIcon" />
    </button>
  );

  return (
    <header className="signup_content">
      <Menubar model={navItems} start={start} end={end} />
      {showPopup && (
        <SignupPopup
          step={popupStep}
          selectedRole={selectedRole}
          onClose={closePopup}
          onSelectRole={handleRoleSelect}
          backToStep1={() => setPopupStep(1)}
          step1Options={accountTypes}
          roleOptions={roleOptions}
          onSelectPlan={handlePlanSelect}
        />
      )}
    </header>
  );
};

export default Header;
