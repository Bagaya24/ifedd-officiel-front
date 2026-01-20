import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isAuth = localStorage.getItem("token"); // On vérifie le token, pas juste "isAuth"
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;