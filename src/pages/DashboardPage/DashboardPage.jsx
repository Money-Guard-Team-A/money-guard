import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
// import Balance from "../../components/Balance/Balance";

const DashboardPage = () => {
  return (
    <div>
      
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
};

export default DashboardPage;

