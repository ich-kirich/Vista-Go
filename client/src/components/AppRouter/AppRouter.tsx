import { Route, Routes as RouterRoutes, Navigate } from "react-router-dom";
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

function AppRouter() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const { user } = useTypedSelector((state) => state.user);
  const authRouters = [
    { path: Routes.HOME, element: <MainPage /> },
    { path: Routes.CITY, element: <CityPage /> },
    { path: Routes.SIGHTS, element: <SightsPage /> },
    { path: Routes.SIGHT_DETAILS, element: <SightPage /> },
  ];
  const publicRouters = [
    { path: Routes.LOGIN, element: <LoginPage /> },
    { path: Routes.REGISTRATION, element: <RegistrationPage /> },
    { path: Routes.CABINET, element: <CabinetPage /> },
    { path: Routes.ERROR, element: <ErrorPage /> },
  ];
  const adminRouters = [{ path: Routes.ADMIN, element: <AdminPage /> }];

  return (
    <RouterRoutes>
      {isAuth && user && (
        <>
          {authRouters.map((item) => (
            <Route element={item.element} path={item.path} key={item.path} />
          ))}
          {user.role === ADMIN_ROLE &&
            adminRouters.map((item) => (
              <Route element={item.element} path={item.path} key={item.path} />
            ))}
        </>
      )}
      {publicRouters.map((item) => (
        <Route element={item.element} path={item.path} key={item.path} />
      ))}
      <Route path="*" element={<Navigate replace to={Routes.ERROR} />} />
    </RouterRoutes>
  );
}

export default AppRouter;
