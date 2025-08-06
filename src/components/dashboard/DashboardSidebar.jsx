import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { authState } from "../../recoil/ctaState";
import logo from "../../assets/logo.png";
import icon1 from "../../assets/d-icon.png";
import icon2 from "../../assets/d-icon1.png";
import icon3 from "../../assets/d-icon2.png";

const DashboardSidebar = () => {
  const user = useRecoilValue(authState).user;
  return (
    <>
      <div className="logo_col_sidebar">
        <img src={logo} alt="Logo" />
      </div>
      {user?.user_type === "seller" ? (
        <div className="nav__dahboard">
          <ul>
            <li>
              <Link to="/dashboard">
                <img src={icon1} alt="-" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/listings">
                <img src={icon2} alt="-" />
                Saved Listing
              </Link>
            </li>
            <li>
              <Link to="/listings">
                <img src={icon3} alt="-" />
                Recently Viewed
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <h2>User Type: {user.user_type}</h2>
      )}
    </>
  );
};
export default DashboardSidebar;
