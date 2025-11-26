import { Navigate, useLocation } from "react-router";
import { useAuth } from "../AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
