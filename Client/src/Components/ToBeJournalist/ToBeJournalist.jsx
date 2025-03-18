import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ToBeJournalist = () => {
  const getUserIdFromToken = () => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken._id;
    } catch (error) {
      console.error("❌ خطأ في فك تشفير التوكن:", error);
      return null;
    }
  };

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    portfolio: "",
    bio: "",
    profileImage: null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setFormData((prevData) => ({ ...prevData, userId }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("portfolio", formData.portfolio);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("profileImage", formData.profileImage);

    const token = Cookies.get("token");

    try {
      const response = await axios.post("http://localhost:8000/api/journalists", formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Application submitted successfully!");
      setMessageType("success");

      Swal.fire({
        title: "Success!",
        text: "Application submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting application");
      setMessageType("error");

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error submitting application",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-8 text-left">
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Become a Publisher
      </h2>

      {message && (
        <div className={`p-4 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="userId" value={formData.userId} />

        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
        />
        
        <input 
          type="text" 
          name="portfolio" 
          placeholder="Portfolio URL" 
          value={formData.portfolio} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
        />
        
        <textarea 
          name="bio" 
          placeholder="About You" 
          value={formData.bio} 
          onChange={handleChange} 
          rows="4" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
        />
        
        <input 
          type="file" 
          name="profileImage" 
          onChange={handleFileChange} 
          required 
          className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-gray-50" 
        />
        
        <button 
          type="submit" 
          className="w-full bg-[#FDB827] text-black py-2 px-4 rounded-md hover:bg-[#e6a823] transition duration-200 inline-block font-medium"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ToBeJournalist;