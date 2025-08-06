import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/ctaState";
import DashboardSidebar from "./DashboardSidebar";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const user = useRecoilValue(authState).user;

  return (
    <>
      {user ? (
        <>
          <div className="dashboard__main_wrap">
            <div className="dashboard__sidebar_wrap">
              <DashboardSidebar />
            </div>
            <div className="dasboard__content_container_wrap"></div>
          </div>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Dashboard;
