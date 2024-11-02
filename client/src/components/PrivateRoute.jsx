import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredRoles = [] }) => {
  let { user } = useAuth();

  // if (!user) {
  //   user = localStorage.getItem("user") || sessionStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  // }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role) console.log(user, 'user', requiredRoles, 'required roles');

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the passed element if all conditions are met
  return element;
};


export default PrivateRoute;
