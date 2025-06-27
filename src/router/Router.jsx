// router/Router.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/appbar";
import ProtectRoutes from "./ProtectRoute";
import { publicRoutes, protectedRoutes } from "./DataRoute";
import Login from "../pages/login";
import Deconnexion from "../deconexion";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes sans header */}
        <Route path="/connexion" element={<Login />} />
        <Route path="/deconnexion" element={<Deconnexion />} />

        {/* Routes AVEC Header */}
        <Route element={<Header />}>
          {/* Routes publiques */}
          {publicRoutes.map((route, index) =>
            route.path !== "/connexion" && route.path !== "/deconnexion" ? (
              <Route key={index} path={route.path} element={route.component} />
            ) : null
          )}

          {/* Routes protégées */}
          <Route element={<ProtectRoutes />}>
            {protectedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
