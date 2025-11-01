/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}) {
  if (isLoading === null || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <div className="min-h-screen flex items-center justify-center gap-4">
            <LoaderCircle className="h-5 w-5 text-brown-6 animate-spin" />
            <p className="text-brown-6 text-lg font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    );
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
