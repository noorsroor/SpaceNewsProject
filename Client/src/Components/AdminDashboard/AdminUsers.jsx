import React, { useEffect, useState } from "react";
import axios from "axios";
import UserMetrics from "./UserMetrics";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Activity,
  Shield,
  FileText,
  Loader2,
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pendingJournalists, setPendingJournalists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [monthlyGrowthData, setMonthlyGrowthData] = useState([]);

  // Refactored fetch function to be reusable after actions
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch users and pending journalist requests
      const resUsers = await axios.get(
        "http://localhost:8000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const resJournalists = await axios.get(
        "http://localhost:8000/api/admin/journalists",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch monthly growth data
      const resGrowthData = await axios.get(
        "http://localhost:8000/api/admin/monthlyGrowthData",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(resUsers.data.users);
      setPendingJournalists(resJournalists.data.journalists);
      setMonthlyGrowthData(resGrowthData.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for actions

  // Change a user's role (for non-pending users)
  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Accept a pending journalist request (change status to approved and role to journalist)
  const handleAcceptJournalist = async (journalistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/admin/journalists/${journalistId}/status`,
        { status: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Soft delete a user
  const handleSoftDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      // Assumes that the DELETE endpoint implements soft delete
      await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Filter users based on role:
  const admins = users.filter((user) => user.role === "admin");
  const approvedJournalists = users.filter(
    (user) => user.role === "journalist"
  );
  const readers = users.filter((user) => user.role === "reader");

  // Chart data for user distribution
  const chartData = [
    { category: "Admins", count: admins.length, color: "#3B82F6" },
    {
      category: "Journalists",
      count: approvedJournalists.length,
      color: "#10B981",
    },
    { category: "Pending", count: pendingJournalists.length, color: "#F59E0B" },
    { category: "Readers", count: readers.length, color: "#8B5CF6" },
  ];

  // Calculate total users for percentage
  const totalUsers =
    admins.length +
    approvedJournalists.length +
    readers.length +
    pendingJournalists.length;

  // User Card Component with actions
  // User Card Component
  const UserCard = ({ user, badgeText, badgeColor, icon: Icon }) => (
    <div className="p-4 bg-white border rounded-lg shadow-sm mb-2 hover:bg-gray-50 transition-colors duration-200">
      {/* Top section: avatar + name + email + role badge */}
      <div className="flex items-center">
        {/* Avatar / Icon */}
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
          {Icon ? (
            <Icon size={20} />
          ) : (
            <span className="text-lg font-semibold">
              {user.fullName.charAt(0)}
            </span>
          )}
        </div>

        {/* Name and Email */}
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900">{user.fullName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Role Badge */}
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
        >
          {badgeText}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-center space-x-4 mt-3">
        {user.status === "pending" ? (
          <button
            onClick={() => handleAcceptJournalist(user._id)}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
          >
            Accept
          </button>
        ) : (
          <select
            value={user.role}
            onChange={(e) => handleRoleChange(user._id, e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          >
            <option value="admin">Admin</option>
            <option value="journalist">Journalist</option>
            <option value="reader">Reader</option>
          </select>
        )}
        <button
          onClick={() => handleSoftDelete(user._id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );

  // Modern donut chart using Recharts
  const DonutChart = () => (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="count"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [
            `${value} (${Math.round((value / totalUsers) * 100)}%)`,
            props.payload.category,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderUserList = () => {
    if (activeTab === "all") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Administrators */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-500" />
                Administrators
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                {admins.length} users
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
              {admins.length === 0 ? (
                <p className="text-gray-500 italic py-4 text-center">
                  No administrators found
                </p>
              ) : (
                admins.map((admin) => (
                  <UserCard
                    key={admin._id}
                    user={admin}
                    badgeText="Admin"
                    badgeColor="bg-blue-100 text-blue-800"
                    icon={Shield}
                  />
                ))
              )}
            </div>
          </div>

          {/* Approved Journalists */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-500" />
                Journalists
              </h2>
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                {approvedJournalists.length} users
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
              {approvedJournalists.length === 0 ? (
                <p className="text-gray-500 italic py-4 text-center">
                  No journalists found
                </p>
              ) : (
                approvedJournalists.map((journalist) => (
                  <UserCard
                    key={journalist._id}
                    user={journalist}
                    badgeText="Journalist"
                    badgeColor="bg-green-100 text-green-800"
                    icon={FileText}
                  />
                ))
              )}
            </div>
          </div>

          {/* Pending Journalists */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-yellow-500" />
                Pending Approvals
              </h2>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                {pendingJournalists.length} requests
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
              {pendingJournalists.length === 0 ? (
                <p className="text-gray-500 italic py-4 text-center">
                  No pending requests
                </p>
              ) : (
                pendingJournalists.map((journalist) => (
                  <UserCard
                    key={journalist._id}
                    user={journalist}
                    badgeText={journalist.status}
                    badgeColor="bg-yellow-100 text-yellow-800"
                    icon={UserPlus}
                  />
                ))
              )}
            </div>
          </div>

          {/* Readers */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                Readers
              </h2>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                {readers.length} users
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
              {readers.length === 0 ? (
                <p className="text-gray-500 italic py-4 text-center">
                  No readers found
                </p>
              ) : (
                readers.map((reader) => (
                  <UserCard
                    key={reader._id}
                    user={reader}
                    badgeText="Reader"
                    badgeColor="bg-purple-100 text-purple-800"
                    icon={Users}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      );
    } else {
      let filteredUsers = [];
      let badgeText = "";
      let badgeColor = "";
      let Icon = Users;

      if (activeTab === "admin") {
        filteredUsers = admins;
        badgeText = "Admin";
        badgeColor = "bg-blue-100 text-blue-800";
        Icon = Shield;
      } else if (activeTab === "journalist") {
        filteredUsers = approvedJournalists;
        badgeText = "Journalist";
        badgeColor = "bg-green-100 text-green-800";
        Icon = FileText;
      } else if (activeTab === "pending") {
        filteredUsers = pendingJournalists;
        badgeText = "Pending";
        badgeColor = "bg-yellow-100 text-yellow-800";
        Icon = UserPlus;
      } else if (activeTab === "reader") {
        filteredUsers = readers;
        badgeText = "Reader";
        badgeColor = "bg-purple-100 text-purple-800";
        Icon = Users;
      }

      return (
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="max-h-96 overflow-y-auto pr-2">
            {filteredUsers.length === 0 ? (
              <p className="text-gray-500 italic py-4 text-center">
                No users found
              </p>
            ) : (
              filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  badgeText={badgeText}
                  badgeColor={badgeColor}
                  icon={Icon}
                />
              ))
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage platform users and access requests
            </p>
          </div>
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "admin"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Admins
            </button>
            <button
              onClick={() => setActiveTab("journalist")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "journalist"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Journalists
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "pending"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } relative`}
            >
              Pending
              {pendingJournalists.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingJournalists.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reader")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "reader"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Readers
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Dashboard Cards and Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* User Distribution Chart */}
              <div className="bg-white p-6 rounded-xl shadow lg:col-span-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  User Distribution
                </h2>
                <DonutChart />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {chartData.map((item) => (
                    <div key={item.category} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="text-sm">
                        <span className="font-medium">{item.category}: </span>
                        <span>{item.count}</span>
                        <span className="text-gray-500 text-xs ml-1">
                          (
                          {totalUsers > 0
                            ? Math.round((item.count / totalUsers) * 100)
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Growth Chart */}
              <div className="bg-white p-6 rounded-xl shadow lg:col-span-5">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                  Monthly User Growth
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="readers"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="journalists"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="admins"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow text-white lg:col-span-3">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  User Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Total Users</span>
                    <span className="text-2xl font-bold">{totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Pending Approvals</span>
                    <span className="text-2xl font-bold">
                      {pendingJournalists.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Journalists Ratio</span>
                    <span className="text-2xl font-bold">
                      {totalUsers > 0
                        ? Math.round(
                            (approvedJournalists.length / totalUsers) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Lists */}
            {renderUserList()}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
