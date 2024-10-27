import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  return currentUser ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default PrivateRoute;
