// src/components/AuthenticatedLayout.js
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthenticatedLayout;
