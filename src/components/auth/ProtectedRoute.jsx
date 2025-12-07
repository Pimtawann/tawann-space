/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}) {
  if (isLoading === null || isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If requiredRole is specified, check if userRole matches
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
