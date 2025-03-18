// src/Components/AdminDashboard/TopNav.jsx
import React from "react";

const TopNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default TopNav;
