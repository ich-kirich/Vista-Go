import { Route, Routes, Navigate } from "react-router-dom";
import CityPage from "../CityPage/CityPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import MainPage from "../MainPage/MainPage";
import SightPage from "../SightPage/SightPage";
import SightsPage from "../SightsPage/SightsPage";

function AppRouter() {
  const routers = [
    { path: "/", element: <MainPage /> },
    { path: "/city/:id", element: <CityPage /> },
    { path: "/city/:id/sights", element: <SightsPage /> },
    { path: "/city/:id/sights/:sightId", element: <SightPage /> },
    { path: "/error", element: <ErrorPage /> },
  ];
  return (
    <Routes>
      {routers.map((item) => (
        <Route element={item.element} path={item.path} key={item.path} />
      ))}
      <Route path="*" element={<Navigate replace to="/error" />} />
    </Routes>
  );
}

export default AppRouter;
