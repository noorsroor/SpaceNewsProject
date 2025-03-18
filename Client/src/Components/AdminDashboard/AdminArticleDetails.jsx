import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8000/api/admin/articles/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data && res.data.article) {
          setArticle(res.data.article);
        } else {
          setError("No article data found.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Generate engagement data for the chart
  const getEngagementData = () => {
    if (!article) return [];

    // Use actual article data for the chart
    return [
      { name: "Views", value: article.viewsCount },
      { name: "Likes", value: article.likesCount },
      { name: "Comments", value: article.commentsCount },
    ];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg shadow">
        <p className="font-medium text-lg text-red-700">Error</p>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          &larr; Back to Articles
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow">
        <p className="font-medium text-lg text-yellow-700">No Article Found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
        >
          &larr; Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with navigation */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-indigo-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Articles
        </button>
        <h1 className="text-3xl font-bold text-white mt-4">{article.title}</h1>
        <div className="flex items-center mt-2">
          <span className="inline-block bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Article content */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </p>
        </div>

        {/* Media section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Images */}
          {article.featuredImage?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {article.featuredImage.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group overflow-hidden rounded-lg shadow-md"
                  >
                    <img
                      src={
                        img.startsWith("http")
                          ? img
                          : `http://localhost:8000${img}`
                      }
                      alt={`Featured ${idx + 1}`}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {article._id && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                </svg>
                Video
              </h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  className="w-full h-64"
                  src={article.featuredVideo}
                  title="Featured Video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Engagement Stats and Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Engagement Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {article.viewsCount}
                </div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {article.likesCount}
                </div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {article.commentsCount}
                </div>
                <div className="text-sm text-gray-500">Comments</div>
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <EngagementBarChart data={getEngagementData()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Bar Chart Component for Engagement Metrics
const EngagementBarChart = ({ data }) => {
  // Find the maximum value to scale the bars appropriately
  const maxValue = Math.max(...data.map((item) => item.value), 10); // Minimum 10 for empty data

  return (
    <div className="w-full h-64 flex flex-col">
      <h4 className="text-sm font-medium text-gray-500 mb-2">
        Engagement Metrics
      </h4>
      <div className="flex-1 flex items-end">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs font-medium text-gray-500 mb-1">
              {item.value}
            </div>
            <div
              className="w-12 bg-indigo-500 rounded-t-md transition-all duration-500"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor:
                  index === 0 ? "#818cf8" : index === 1 ? "#6366f1" : "#4f46e5",
              }}
            ></div>
            <div className="text-xs font-medium text-gray-500 mt-2">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticleDetails;
