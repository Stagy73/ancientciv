import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Inscription réussie !");
    } else {
      alert(data.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Créer un compte</button>
    </form>
  );
};

export default Register;
