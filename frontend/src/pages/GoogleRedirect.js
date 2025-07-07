// pages/GoogleRedirect.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Connexion en cours...</p>;
};

export default GoogleRedirect;
