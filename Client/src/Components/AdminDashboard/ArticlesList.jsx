import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClipboardList, Check, X, Loader2 } from "lucide-react";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch articles from the server
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data.articles);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Handle approving or rejecting an article
  const handleStatusChange = async (articleId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/admin/articles/${articleId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setArticles((prev) =>
        prev.map((a) => (a._id === articleId ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // Prepare data for charts
  const getStatusCounts = () => {
    const counts = { approved: 0, pending: 0, rejected: 0 };
    articles.forEach((article) => {
      counts[article.status]++;
    });
    return [
      { name: "Approved", value: counts.approved, color: "#10B981" },
      { name: "Pending", value: counts.pending, color: "#F59E0B" },
      { name: "Rejected", value: counts.rejected, color: "#EF4444" },
    ];
  };

  const getRecentActivityData = () => {
    // For demonstration, generating activity data based on articles
    // In a real app, you might have timestamp data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }).reverse();

    return last7Days.map((day) => ({
      day,
      approved: Math.floor(Math.random() * 5),
      rejected: Math.floor(Math.random() * 3),
      pending: Math.floor(Math.random() * 7),
    }));
  };

  const statusData = getStatusCounts();
  const activityData = getRecentActivityData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Content Management Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and review submitted articles
        </p>
      </div>

      {/* Stats and Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Status Distribution Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Content Status Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-4">
            {statusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="text-sm text-gray-600">
                  {status.name}: {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="approved"
                  name="Approved"
                  fill="#10B981"
                  stackId="stack"
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#F59E0B"
                  stackId="stack"
                />
                <Bar
                  dataKey="rejected"
                  name="Rejected"
                  fill="#EF4444"
                  stackId="stack"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              Articles Management
            </h2>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
            {articles.length} Articles
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No articles found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr
                    key={article._id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/admin/articles/${article._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          article.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : article.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {article.status === "pending" && (
                        <div className="flex space-x-2">
                          <button
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleStatusChange(article._id, "approved");
                            }}
                          >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Approve
                          </button>
                          <button
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(article._id, "rejected");
                            }}
                          >
                            <X className="h-3.5 w-3.5 mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                      {article.status !== "pending" && (
                        <span className="text-gray-400">
                          No actions available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
