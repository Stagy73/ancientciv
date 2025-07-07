// src/pages/BrowseUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const BrowseUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ search: "", minPoints: 0 });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur récupération utilisateurs:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const filtered = users.filter((u) => {
    const matchName =
      u.username?.toLowerCase().includes(filter.search.toLowerCase()) ||
      u.name?.toLowerCase().includes(filter.search.toLowerCase());
    const matchPoints = u.points >= filter.minPoints;
    return matchName && matchPoints;
  });

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h2>Explorer les utilisateurs</h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="🔍 Rechercher un nom..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <input
            type="number"
            placeholder="Min. points"
            value={filter.minPoints}
            onChange={(e) =>
              setFilter({ ...filter, minPoints: parseInt(e.target.value) || 0 })
            }
          />
        </div>

        {filtered.map((u) => (
          <div
            key={u._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <strong>{u.username || u.name || u.email}</strong>
            <p>{u.description || "Aucune description"}</p>
            <p>Points : {u.points}</p>
            {u.profilePic && (
              <img
                src={`http://localhost:5000${u.profilePic}`}
                alt="avatar"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BrowseUsers;
