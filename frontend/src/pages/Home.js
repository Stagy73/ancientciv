import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    profilePic: null,
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          username: res.data.username || "",
          description: res.data.description || "",
          profilePic: null,
        });
      } catch (err) {
        console.error("Erreur profil:", err);
      }
    };

    const fetchPoints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/arena/score", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPoints(res.data.points || 0);
      } catch (err) {
        console.error("Erreur récupération des points:", err);
      }
    };

    if (token) {
      fetchProfile();
      fetchPoints();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("description", formData.description);
      if (formData.profilePic) form.append("profilePic", formData.profilePic);

      const res = await axios.put("http://localhost:5000/api/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data);
      setMessage("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur mise à jour:", err);
      setMessage("Erreur lors de la mise à jour du profil.");
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
        <h1 style={{ fontSize: "2em", textAlign: "center" }}>
          Bienvenue dans <span style={{ color: "#6e44ff" }}>Codex Arcana</span>,{" "}
          {user.name || user.username}
        </h1>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Ici commence ta légende...
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 30,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {user.profilePic && (
            <img
              src={`http://localhost:5000${user.profilePic}`}
              alt="Profil"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #6e44ff",
              }}
            />
          )}
          <div>
            <p>
              <strong>Points :</strong> {userPoints}
            </p>
            <p>
              <strong>Historique :</strong>{" "}
              {user.history?.join(", ") || "Aucune action enregistrée."}
            </p>
            <p>
              <strong>Description :</strong>{" "}
              {user.description || "Aucune description."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>
          <h3>Modifier ton profil</h3>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          ></textarea>
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#6e44ff",
              color: "white",
              border: "none",
              borderRadius: 5,
            }}
          >
            Enregistrer les modifications
          </button>
        </form>
        <button
          onClick={() => (window.location.href = "/browse")}
          style={{
            marginTop: 20,
            backgroundColor: "#333",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 5,
          }}
        >
          🔍 Voir les autres profils
        </button>

        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </div>
    </>
  );
};

export default Home;
