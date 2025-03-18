import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('user-details');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/user/details/${id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [id]);

  const savedArticles = [
    { id: 1, title: "The Future of AI", date: "Feb 12, 2025" },
    { id: 2, title: "Exploring Mars", date: "Jan 30, 2025" },
    { id: 3, title: "Ancient Civilizations", date: "Jan 15, 2025" }
  ];

  const readingHistory = [
    { id: 4, title: "Climate Change Solutions", date: "Mar 10, 2025", progress: "100%" },
    { id: 5, title: "Quantum Computing", date: "Mar 5, 2025", progress: "75%" },
    { id: 6, title: "World Economics", date: "Feb 28, 2025", progress: "30%" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8 text-center">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">AJ</span>
          </div>
          <p className="text-gray-500 text-sm">Profile ID: {id}</p>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('user-details')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'user-details' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3">👤</span> User Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('saved-articles')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'saved-articles' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3">📑</span> Saved Articles
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('reading-history')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'reading-history' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3">📚</span> Reading History
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'user-details' && userData && (
            <div id="user-details">
              <h1 className="text-2xl font-bold mb-6">User Details</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">Full Name</h3>
                    <p className="font-medium">{userData.fullName}</p>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">Email</h3>
                    <p className="font-medium">{userData.email}</p>
                  </div>

                  {/* Member Since */}
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">Member Since</h3>
                    <p className="font-medium">{new Date(userData.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Interests */}
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">Interests</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userData.preferences.map((interest, index) => (
                        <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved-articles' && (
            <div id="saved-articles">
              <h1 className="text-2xl font-bold mb-6">Saved Articles</h1>
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {savedArticles.map(article => (
                  <div key={article.id} className="p-4 hover:bg-gray-50">
                    <h3 className="font-medium text-lg">{article.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-500 text-sm">{article.date}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Read</button>
                        <button className="text-red-600 hover:text-red-800">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reading-history' && (
            <div id="reading-history">
              <h1 className="text-2xl font-bold mb-6">Reading History</h1>
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {readingHistory.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50">
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-500 text-sm">{item.date}</span>
                      <span className="text-blue-600 font-medium">{item.progress} completed</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: item.progress }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
