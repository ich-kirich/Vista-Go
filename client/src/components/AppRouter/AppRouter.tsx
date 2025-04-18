import {
  Route,
  Routes as RouterRoutes,
  Navigate,
  Outlet,
} from "react-router-dom";
import useTypedSelector from "../../hooks/useTypedSelector";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import CityPage from "../../pages/CityPage/CityPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import MainPage from "../../pages/MainPage/MainPage";
import SightPage from "../../pages/SightPage/SightPage";
import SightsPage from "../../pages/SightsPage/SightsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import CabinetPage from "../../pages/CabinetPage/CabinetPage";
import { ADMIN_ROLE } from "../../libs/constants";
import AdminPage from "../../pages/AdminPage/AdminPage";
import { Routes } from "../../libs/enums";
import { getValidToken } from "../../libs/utils";

function AppRouter() {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { user } = useTypedSelector((state) => state.user);

  const ProtectedRoute = () => {
    const token = getValidToken();

    if (!isAuth && !token) {
      return <Navigate to={Routes.LOGIN} replace />;
    }

    return <Outlet />;
  };

  const AdminRoute = () => {
    const token = getValidToken();

    if (!isAuth && !token) {
      return <Navigate to={Routes.LOGIN} replace />;
    }

    if (user?.role !== ADMIN_ROLE) {
      return <Navigate to={Routes.HOME} replace />;
    }

    return <Outlet />;
  };

  return (
    <RouterRoutes>
      <Route path={Routes.LOGIN} element={<LoginPage />} />
      <Route path={Routes.REGISTRATION} element={<RegistrationPage />} />
      <Route path={Routes.ERROR} element={<ErrorPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={Routes.HOME} element={<MainPage />} />
        <Route path={Routes.CITY} element={<CityPage />} />
        <Route path={Routes.SIGHTS} element={<SightsPage />} />
        <Route path={Routes.SIGHT_DETAILS} element={<SightPage />} />
        <Route path={Routes.CABINET} element={<CabinetPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path={Routes.ADMIN} element={<AdminPage />} />
      </Route>

      <Route path="*" element={<Navigate to={Routes.ERROR} replace />} />
    </RouterRoutes>
  );
}

export default AppRouter;
