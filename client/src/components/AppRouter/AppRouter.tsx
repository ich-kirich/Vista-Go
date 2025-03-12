import { Route, Routes, Navigate } from "react-router-dom";
import useTypedSelector from "../../hooks/useTypedSelector";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import CityPage from "../CityPage/CityPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import MainPage from "../MainPage/MainPage";
import SightPage from "../SightPage/SightPage";
import SightsPage from "../SightsPage/SightsPage";
import LoginPage from "../LoginPage/LoginPage";
import CabinetPage from "../CabinetPage/CabinetPage";
import { ADMIN_ROLE } from "../../libs/constants";
import AdminPanel from "../AdminPanel/AdminPanel";

function AppRouter() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const { user } = useTypedSelector((state) => state.user);
  const authRouters = [
    { path: "/home", element: <MainPage /> },
    { path: "/city/:id", element: <CityPage /> },
    { path: "/cabinet", element: <CabinetPage /> },
    { path: "/city/:id/sights", element: <SightsPage /> },
    { path: "/city/:id/sights/:sightId", element: <SightPage /> },
  ];
  const publicRouters = [
    { path: "/", element: <LoginPage /> },
    { path: "/registration", element: <RegistrationPage /> },
    { path: "/error", element: <ErrorPage /> },
  ];
  const adminRouters = [{ path: "/admin", element: <AdminPanel /> }];
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
      <Route path="*" element={<Navigate replace to="/error" />} />
    </Routes>
  );
}

export default AppRouter;
