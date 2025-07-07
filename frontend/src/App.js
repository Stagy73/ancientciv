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
import Arena from "./pages/game/Arena";
import SelectRace from "./pages/game/SelectRace"; // 👈

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
          <Route path="/arena" element={<Arena />} />
          <Route path="/game/select-race" element={<SelectRace />} /> {/* 👈 */}
          <Route path="/browse" element={<BrowseUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
