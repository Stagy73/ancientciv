import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Vérification côté client du mot de passe fort
  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isStrongPassword(formData.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        { withCredentials: true }
      );

      const token = res.data.token;
      if (!token) {
        setError("Le serveur n’a pas renvoyé de token.");
        return;
      }

      localStorage.setItem("token", token);
      setSuccess("Inscription réussie !");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        (err.response?.status === 409
          ? "Email déjà utilisé."
          : "Erreur lors de l’inscription.");
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
          type="text"
          placeholder="Nom"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
