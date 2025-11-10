import React from "react";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect to login
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Welcome to the Feed!</h2>
      <p>This page is protected. Only logged-in users can see it.</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}
