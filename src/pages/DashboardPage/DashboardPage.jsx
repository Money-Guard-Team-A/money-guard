import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

export default function DashboardPage() {
  return (
    <div>
      {/* <h1>Dashboard Page</h1> */}
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}
