import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/ctaState";
import notifInfo from "../../assets/notifInfo.png";
import serachIcon from "../../assets/serachIcon.png";
import userImg from "../../assets/userImg.png";
import SellerListing from "./BusinessListing/SellerListing";
import { Routes, Route } from "react-router-dom";

const DashboardContent = () => {
  const user = useRecoilValue(authState).user;

  return (
    <>
      {user.user_type === "admin" ? (
        "My Admin Dash"
      ) : (
        <>
          {/* Dashboard Header */}
          <div className="dashboard__header_block">
            <h3>Dashboard</h3>
            <div className="dashboard__header_search_notification_wrap">
              <div className="dashboard__search_field_wrap">
                <input type="text" placeholder="Search" />
                <img src={serachIcon} alt="" />
              </div>
              <div className="dashboard__notification_wrap">
                <button>
                  <img src={notifInfo} alt="" />
                </button>
              </div>
              <div className="dashboard__user_wrap">
                <button>
                  <img src={userImg} alt="" />
                </button>
              </div>
            </div>
          </div>

          {/* Page Content based on URL */}
          {/* <Routes> */}
          <Route
            path="dashboard"
            element={
              <>
                <h4>
                  👋 Welcome, {user?.first_name} {user?.last_name}
                </h4>
                <p>
                  Let’s get your first business listing published and connect
                  with qualified buyers.
                </p>
              </>
            }
          />
          <Route path="/saved-listing" element={<div>Saved Listing</div>} />
          <Route
            path="/my-listing"
            element={<div>My {user?.user_type} Profile</div>}
          />
          <Route path="/recently-viewed" element={<div>Recently Viewed</div>} />

          {/* Example: Load Seller Listing component inside "My Listing" */}
          <Route path="/my-listing/seller" element={<SellerListing />} />
          {/* </Routes> */}
        </>
      )}
    </>
  );
};

export default DashboardContent;
