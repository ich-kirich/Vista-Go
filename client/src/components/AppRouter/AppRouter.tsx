import { Route, Routes, Navigate } from "react-router-dom";
import useTypedSelector from "../../hooks/useTypedSelector";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import CityPage from "../../pages/CityPage/CityPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import MainPage from "../../pages/MainPage/MainPage";
import SightPage from "../../pages/SightPage/SightPage";
import SightsPage from "../../pages/SightsPage/SightsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import CabinetPage from "../../pages/CabinetPage/CabinetPage";
import { ADMIN_ROLE, ROUTES } from "../../libs/constants";
import AdminPage from "../../pages/AdminPage/AdminPage";

function AppRouter() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const { user } = useTypedSelector((state) => state.user);
  const authRouters = [
    { path: ROUTES.HOME, element: <MainPage /> },
    { path: ROUTES.CITY, element: <CityPage /> },
    { path: ROUTES.SIGHTS, element: <SightsPage /> },
    { path: ROUTES.SIGHT_DETAILS, element: <SightPage /> },
  ];
  const publicRouters = [
    { path: ROUTES.LOGIN, element: <LoginPage /> },
    { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
    { path: ROUTES.CABINET, element: <CabinetPage /> },
    { path: ROUTES.ERROR, element: <ErrorPage /> },
  ];
  const adminRouters = [{ path: ROUTES.ADMIN, element: <AdminPage /> }];

  return (
    <Routes>
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
      <Route path="*" element={<Navigate replace to={ROUTES.ERROR} />} />
    </Routes>
  );
}

export default AppRouter;
