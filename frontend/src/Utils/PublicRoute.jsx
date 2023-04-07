import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./Common";

// handle the public routes
function PublicRoute() {
  return !getToken() ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoute;
