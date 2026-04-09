import { Navigate, useLocation } from "react-router-dom";
import { isAdminUser, isAuthenticated } from "../utils/auth";

function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdminUser()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
