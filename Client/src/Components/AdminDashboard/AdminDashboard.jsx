// src/Components/AdminDashboard/AdminDashboard.jsx
import React from "react";
import DashboardMetrics from "./DashboardMetrics";
import ArticlesList from "./ArticlesList";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
      <DashboardMetrics />
      <div className="mt-8">
        <ArticlesList />
      </div>
    </div>
  );
};

export default AdminDashboard;
