import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import Loader from "../Loader/Loader";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { refresh } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);
const HomeTab = lazy(() => import("../../pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() =>
  import("../../pages/StatisticsTab/StatisticsTab")
);
const CurrencyTab = lazy(() => import("../../pages/CurrencyTab/CurrencyTab"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);
  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />

            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={<CurrencyTab />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
