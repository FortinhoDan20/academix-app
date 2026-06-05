import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // TEMPORAIRE
  // après on utilisera Redux Toolkit


 // const { user } = useSelector((state) => ({ ...state.auth }))

   const storedProfile = JSON.parse(localStorage.getItem("profile"));
   console.log("object:", storedProfile )

  // PAS CONNECTÉ
  if (!storedProfile) {
    return <Navigate to="/login" replace />;
  }

  // CONNECTÉ
  return children;
};

export default ProtectedRoute;