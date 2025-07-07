import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Connecté !");
      console.log("Token:", data.token);
      localStorage.setItem("token", data.token);
    } else {
      alert(data.message || "Erreur lors du login");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
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
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
