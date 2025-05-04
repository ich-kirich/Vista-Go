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
import AdminPage from "../../pages/AdminPage/AdminPage";
import { ROLES, Routes } from "../../libs/enums";
import { getValidToken } from "../../libs/utils";
import GuidePage from "../../pages/GuidePage/GuidePage";
import GeoMapPage from "../../pages/GeoMapPage/GeoMapPage";
import Loader from "../Loader/Loader";
import { Suspense } from "react";

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

    if (user?.role !== ROLES.ADMIN && user?.role !== ROLES.SUPER_ADMIN) {
      return <Navigate to={Routes.HOME} replace />;
    }

    return <Outlet />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <RouterRoutes>
        <Route path={Routes.LOGIN} element={<LoginPage />} />
        <Route path={Routes.REGISTRATION} element={<RegistrationPage />} />
        <Route path={Routes.ERROR} element={<ErrorPage />} />
        <Route path={Routes.HOME} element={<MainPage />} />
        <Route path={Routes.CITY} element={<CityPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={Routes.SIGHTS} element={<SightsPage />} />
          <Route path={Routes.SIGHT_DETAILS} element={<SightPage />} />
          <Route path={Routes.CABINET} element={<CabinetPage />} />
          <Route path={Routes.GUIDE} element={<GuidePage />} />
          <Route path={Routes.MAP} element={<GeoMapPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path={Routes.ADMIN} element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to={Routes.ERROR} replace />} />
      </RouterRoutes>
    </Suspense>
  );
}

export default AppRouter;
