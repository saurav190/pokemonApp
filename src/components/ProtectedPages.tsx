import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPages: React.FC = () => {

 const currentUser = JSON.parse(localStorage.getItem("loginuser")|| "null");
console.log(currentUser);

 

  if (currentUser === null) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default ProtectedPages;
