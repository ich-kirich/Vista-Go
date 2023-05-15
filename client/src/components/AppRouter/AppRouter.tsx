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

function AppRouter() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
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
  return (
    <Routes>
      {isAuth &&
        authRouters.map((item) => (
          <Route element={item.element} path={item.path} key={item.path} />
        ))}
      {publicRouters.map((item) => (
        <Route element={item.element} path={item.path} key={item.path} />
      ))}
      <Route path="*" element={<Navigate replace to="/error" />} />
    </Routes>
  );
}

export default AppRouter;
