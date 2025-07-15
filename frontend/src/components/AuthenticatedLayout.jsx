// src/components/AuthenticatedLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Banner from "./Banner"; // 👈 N'oublie pas d'importer la bannière

const AuthenticatedLayout = () => {
  return (
    <div style={{ position: "relative" }}>
      <Navbar /> {/* La Navbar toujours en haut */}
      <Banner /> {/* La Banner visible sur toutes les pages */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
