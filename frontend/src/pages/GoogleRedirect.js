import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token); // 🔐 stocker le token
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Connexion en cours...</p>;
};

export default GoogleRedirect;
