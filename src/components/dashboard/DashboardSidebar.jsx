import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../recoil/ctaState";
import logo from "../../assets/logo.png";
import SellerFreeNav from "./dasboardNav/SellerFreeNav";
import SelleListingNav from "./dasboardNav/SelleListingNav";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = () => {
  const user = useRecoilValue(authState).user;
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/");
  };
  return (
    <>
      <div className="logo_col_sidebar">
        <img src={logo} alt="Logo" />
        {user?.user_type}
      </div>
      {user?.user_type === "seller" ? <SelleListingNav /> : " "}
      {user?.user_type === "buyer" ? <SellerFreeNav /> : " "}
      {user?.user_type === "subscriber" ? <SellerFreeNav /> : " "}
      {user?.user_type === "m&a_expert" ? <SellerFreeNav /> : " "}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </>
  );
};
export default DashboardSidebar;
