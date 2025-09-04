import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Register from "./components/register";
import Login from "./components/login";
import AboutUS from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/dashboard/dashboard";
import SellerListing from "./components/dashboard/DasboardContentComponents/SellerListing";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DashboardContent from "./components/dashboard/dashboardContent";
import AdminUsersShow from "./components/dashboard/AdminContent/AdminUserShow";
import ProfileFormBuyer from "./components/dashboard/DasboardContentComponents/FreeBuyerProfileForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* dashboard pages */}
        {/* <Route path="user/dashboard" element={<Dashboard />} />
        <Route path="user/saved-listing" element={<Dashboard />} />
        <Route path="user/my-listing" element={<Dashboard />} />
        <Route path="user/recently-viewed" element={<Dashboard />} /> */}

        <Route path="user" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="saved-listing" element={<div>Saved Listing</div>} />
          <Route path="my-listing" element={<SellerListing />} />
          <Route path="recently-viewed" element={<>adds</>} />
          <Route
            path="complete-profile-buyer-free"
            element={<ProfileFormBuyer />}
          />
        </Route>
        <Route path="admin" element={<Dashboard />}>
          <Route path="users" element={<AdminUsersShow />} />
          <Route path="inquiries" element={"inquiries are here!"} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
