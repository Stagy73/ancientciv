import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 🔐 Envoie des identifiants
      const res = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );

      const token = res.data.token;
      if (!token) {
        setError("Erreur : le serveur n’a pas renvoyé de token.");
        return;
      }

      // 💾 Stockage du token
      localStorage.setItem("token", token);

      // 🔎 Vérifie l'authentification via /api/profile
      const profileRes = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (profileRes.status === 200) {
        setSuccess("Connexion réussie !");
        setTimeout(() => navigate("/home"), 1000); // ⏳ Redirection
      } else {
        setError("Erreur d'authentification.");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        (err.response?.status === 401
          ? "Identifiants invalides."
          : "Erreur de connexion au serveur.");
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Login;
