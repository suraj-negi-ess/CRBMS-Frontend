import React, { useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
