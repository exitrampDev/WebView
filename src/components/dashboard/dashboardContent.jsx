import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/ctaState";
import notifInfo from "../../assets/notifInfo.png";
import serachIcon from "../../assets/serachIcon.png";
import userImg from "../../assets/userImg.png";
import { Routes, Route } from "react-router-dom";

const DashboardContent = () => {
  const user = useRecoilValue(authState).user;

  return (
    <>
      <div className="dashboard__header_block">
        <h3>{user.user_type} Dashboard</h3>

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
      <div className="">
        <h4>
          👋 Welcome, {user.first_name} {user.last_name}
        </h4>
        <p>
          Let’s get your first business listing published and connect with
          qualified buyers.
        </p>
      </div>
    </>
  );
};

export default DashboardContent;
