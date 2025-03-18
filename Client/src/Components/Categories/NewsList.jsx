import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaThLarge, FaList, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt"); // Default to latest
  const itemsPerPage = 12;
  const navigate = useNavigate();


  const handleArticleClick = (articleId) => {
    navigate(`/ArticleDetails/${articleId}`);
  };

  const categories = [
    "The Solar System",
    "Astrobiology & Alien Life",
    "Astronomy & Space Science",
    "Space Technology & Innovation",
  ];

  const sortOptions = {
    "Latest": "-createdAt",
    "Newest": "createdAt",
    "Most Viewed": "-viewsCount",
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/articles/filter", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            category: categoryFilter,
            sort: sortBy,
          },
        });
        setArticles(response.data.articles);
        setTotalResults(response.data.total);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, searchQuery, categoryFilter, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  console.log(articles);



    const handleViewArticle = async (articleId) => {
      try {
        await axios.post(`http://localhost:8000/api/articles/view/${articleId}`, {}, { withCredentials: true });
      } catch (error) {
        console.error("Error updating article views:", error);
      }
    };

    

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8">News</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
          {/* Category Filter */}
          <select
            className="border px-4 py-2 rounded text-gray-700"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            className="border px-4 py-2 rounded text-gray-700"
            value={sortBy} // Ensure the displayed value matches the selected key
            onChange={(e) => setSortBy(e.target.value)} // Update state with the selected key
            >
            <option value="">SORT BY</option>
            {Object.keys(sortOptions).map((key, index) => (
                <option key={index} value={key}>{key}</option> // Keep value as key, not the query
            ))}
            </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <p className="text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
          </p>
          <div className="flex ml-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "text-blue-600" : "text-gray-400"}`}
              aria-label="Grid view"
            >
              <FaThLarge size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "text-blue-600" : "text-gray-400"}`}
              aria-label="List view"
            >
              <FaList size={16} />
            </button>
          </div>
        </div>
      </div>

       {/* Articles Grid/List */}
{loading ? (
  <div className="flex justify-center py-12">
    <p>Loading articles...</p>
  </div>
) : error ? (
  <div className="flex justify-center py-12">
    <p className="text-red-500">{error}</p>
  </div>
) : (
  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
    {articles.map((article) => (
      <div 
        key={article._id} 
        onClick={() => {
          handleViewArticle(article._id);
          handleArticleClick(article._id);
        }}
        className={`${viewMode === "list" ? "flex space-x-4" : "flex flex-col bg-white shadow-sm rounded-md overflow-hidden cursor-pointer"}`}
      >
        <div className={`${viewMode === "list" ? "w-36 h-36" : "w-full h-48"} relative overflow-hidden`}>
          <img
            src={article.featuredImage?.length > 0 ? `http://localhost:8000${article.featuredImage[0]}` : "/images/default-news.jpg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Date badge */}
          {/* Category label */}
          <div className="absolute bottom-0 left-0 bg-yellow-400 text-white py-1 px-4 uppercase text-sm font-medium">
            {article.category || "PHOTOS"}
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800 leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-500 font-normal mb-4">
            {article.excerpt || article.content?.substring(0, 100) + '...' || 'Typography is the visual component of the written word. It is for the benefit of the reader, not the writer.'}
          </p>
          <div className="flex items-center text-gray-400 text-sm">
          <span className="flex items-center mr-4">
  <svg
    className="w-4 h-4 mr-1"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
  {article.viewsCount}
</span>
            <span className="text-lg font-bold leading-none">
              {new Date(article.createdAt).getDate()}
            </span>
            <span className="text-xs uppercase">
              {new Date(article.createdAt).toLocaleString('default', { month: 'short' })}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Pagination could be added here */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 cursor-pointer bg-gray-200 rounded mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 cursor-pointer bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
