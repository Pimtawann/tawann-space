/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
  if (isLoading === null || isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthenticationRoute;
