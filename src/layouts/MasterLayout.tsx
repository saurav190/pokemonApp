import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const MasterLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MasterLayout;
