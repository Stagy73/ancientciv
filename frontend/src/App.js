// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Game from "./pages/Game";
import BrowseUsers from "./pages/BrowseUsers";
import GoogleRedirect from "./pages/GoogleRedirect";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google-redirect" element={<GoogleRedirect />} />

        {/* Protégé */}
        <Route
          element={
            <PrivateRoute>
              <AuthenticatedLayout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/browse" element={<BrowseUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
