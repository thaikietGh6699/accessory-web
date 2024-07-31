import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./body/Header";
import Footer from "./body/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
