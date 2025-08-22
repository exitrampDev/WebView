import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../recoil/ctaState";
import notifInfo from "../../assets/notifInfo.png";
import serachIcon from "../../assets/serachIcon.png";
import userImg from "../../assets/userImg.png";
import { activePageAtom } from "../../recoil/ctaState";
import SellerListing from "./BusinessListing/SellerListing";

const dashboardContent = () => {
  const user = useRecoilValue(authState).user;
  const activePage = useRecoilValue(activePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <div>Dashboard</div>;
      case "Saved Listing":
        return <div>Save Listing</div>;
      case "My Listing":
        return <div>My {user?.user_type} Profile</div>;
      case "Recently Viewed":
        return <div>Recently Viewed</div>;
    }
  };
  return (
    <>
      <div className="dashboard__header_block">
        <h3>{renderPage()} </h3>
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

      {activePage === "Dashboard" && (
        <>
          <h4>
            👋 Welcome, {user?.first_name} {user?.last_name}{" "}
          </h4>
          <p>
            Let’s get your first business listing published and connect with
            qualified buyers.
          </p>
        </>
      )}

      {activePage === "My Listing" && (
        <>
          <SellerListing />
        </>
      )}
    </>
  );
};
export default dashboardContent;
