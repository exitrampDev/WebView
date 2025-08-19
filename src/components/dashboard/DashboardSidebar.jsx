import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/ctaState";
import logo from "../../assets/logo.png";
import SellerFreeNav from "./dasboardNav/SellerFreeNav";

const DashboardSidebar = () => {
  const user = useRecoilValue(authState).user;
  return (
    <>
      <div className="logo_col_sidebar">
        <img src={logo} alt="Logo" />
      </div>
      {user?.user_type === "seller" ? (
        <SellerFreeNav />
      ) : (
        <h2>User Type: {user.user_type}</h2>
      )}
    </>
  );
};
export default DashboardSidebar;
