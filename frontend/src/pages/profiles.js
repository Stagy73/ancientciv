// src/pages/Users.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Tous les profils</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {users.map((user) => (
            <div
              key={user._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                padding: 20,
                width: 300,
              }}
            >
              {user.profilePic && (
                <img
                  src={`http://localhost:5000${user.profilePic}`}
                  alt="Profil"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <h3>{user.username || user.email}</h3>
              <p>
                <strong>Description :</strong> {user.description || "Aucune"}
              </p>
              <p>
                <strong>Points :</strong> {user.points}
              </p>
              <p>
                <strong>Historique :</strong>{" "}
                {user.history?.join(", ") || "Aucun"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
