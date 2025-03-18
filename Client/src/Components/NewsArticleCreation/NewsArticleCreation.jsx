import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NewsArticleCreation = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(null);
  const [categoryF, setCategoryF] = useState("");

  const categories = [
    "Astrobiology & Alien Life",
    "Astronomy & Space Science",
    "Space Technology & Innovation",
  ];

  console.log(categoryF);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: categoryF,
    tags: "",
    featuredImage: [], 
    featuredVideo: "",
  });

  const authorId = useSelector((state) => state.user.userId);
  const userRole = useSelector((state) => state.user.role);  

  useEffect(() => {
    if (authorId) {
      fetch(`http://localhost:8000/api/user/details/${authorId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("User Data:", data);  
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [authorId]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // console.log(localStorage.getItem("token"));


  const handleChange = (e) => {
    if (e.target.name === "featuredImage") {
      setFormData({ ...formData, featuredImage: [...e.target.files] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!authorId) {
      setError("User not authenticated.");
      return;
    }

    if (userRole === "reader") {  
      setError("Permission denied. You are not allowed to publish articles.");
      return;
    }

    try {
      const token = getCookie("token");
//       const token = localStorage.getItem("token");
// console.log("Token from localStorage:", token);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", categoryF);
      data.append("tags", formData.tags);
      data.append("featuredVideo", formData.featuredVideo);
      data.append("authorId", authorId);

     
      formData.featuredImage.forEach((image) => {
        data.append("featuredImage", image);
      });

      const response = await axios.post("http://localhost:8000/api/articles/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Article created successfully!");
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        featuredImage: [],
        featuredVideo: "",
      });
    } catch (err) {
      console.error("Error creating article:", err);
      setError(err.response?.data?.error || "Failed to create article");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-10 mb-10">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg border-t-4 border-t-[#FDB827]">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#FDB827]">
          Create a New Article
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
                required
              />
            </div>
            <div>
              {/* Category Filter */}
              <label className="block text-gray-700 mb-2 mt-1 font-medium">Category</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent px-4 py-2 rounded text-gray-700"
            value={categoryF}
            onChange={(e) => setCategoryF(e.target.value)}
          >
            <option value="The Solar System">The Solar System</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Content</label>
            <textarea
              name="content"
              placeholder="Write your article content here..."
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="exclusive, trending (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Featured Video URL
              </label>
              <input
                type="text"
                name="featuredVideo"
                placeholder="https://youtube.com/..."
                value={formData.featuredVideo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Featured Images (Multiple)
            </label>
            <input
              type="file"
              name="featuredImage"
              accept="image/*"
              multiple 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FDB827] text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-[#e9a91f] transition duration-300 shadow-md"
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsArticleCreation;
