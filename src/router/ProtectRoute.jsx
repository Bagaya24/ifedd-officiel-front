import { Navigate, Outlet } from "react-router-dom";

function ProtectRoutes() {
  const isAuth = localStorage.getItem("token"); // On vérifie le token, pas juste "isAuth"
  return isAuth ? <Outlet /> : <Navigate to="/connexion" />;
}

export default ProtectRoutes;
