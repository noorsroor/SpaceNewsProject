import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const FeaturedSection = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const navigate = useNavigate();

  const handleReadMore = (id) => {
      navigate(`/ArticleDetails/${id}`);
  };

  useEffect(() => {
    // Fetch top 4 most viewed articles
    const fetchTopArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles/top-viewed");
        setFeaturedNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching featured articles:", error);
      }
    };
    fetchTopArticles();
  }, []);

  // Card component for news items
  const NewsCard = ({ item, size = "medium" }) => {
    // Dynamically set the background image URL for each article
    const backgroundImageUrl = item.featuredImage && item.featuredImage.length > 0
      ? `http://localhost:8000${item.featuredImage[0]}`
      : "/images/default-news.jpg";

    return (
      <div
        className={`relative overflow-hidden rounded-lg ${
          size === "large" ? 'h-[400px] lg:h-[530px]' : 'h-64'
        }`}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          {/* Article Tag and Read Time */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="inline-flex items-center">
              <span className="w-5 h-5 mr-1 rounded-full bg-white/20 flex items-center justify-center text-xs">ⓘ</span>
              <span className="text-xs font-medium tracking-wider">ARTICLE</span>
            </span>
            {item.viewsCount && (
              <span className="text-xs font-medium tracking-wider">{item.viewsCount}</span>
            )}
          </div>
          
          {/* Title */}
          <h3 className={`font-bold ${
            size === "large" ? 'text-2xl md:text-3xl leading-tight' : 'text-xl leading-snug'
          }`}>
            {item.title}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white mt-10 mb-10">
      <div className="container mx-auto px-18 py-8"> {/* Increased padding from px-4 to px-8 */}
        {/* Section Header */}
        <div className="flex justify-between items-center mb-15 mt-5">
          <h2 className="text-4xl md:text-4xl font-bold text-black">Featured News</h2>
          <Link to="/Categories" className="flex items-center">
            <span className="mr-2 hidden md:block font-semibold">Most Viewed</span>
            <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">→</span>
          </Link>
        </div>
        
        {/* News Grid */}
        {featuredNews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Large Featured Article */}
            <div className="lg:col-span-7 h-100 cursor-pointer" onClick={()=>{handleReadMore(featuredNews[0]._id)}}>
              <NewsCard item={featuredNews[0]} size="large" />
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-1 gap-4 " >
              <div className="cursor-pointer" onClick={()=>{handleReadMore(featuredNews[1]._id)}}>
              <NewsCard key={featuredNews[1]?._id} item={featuredNews[1] || {}} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
                <div className="cursor-pointer" onClick={()=>{handleReadMore(featuredNews[2]._id)}}>
                <NewsCard key={featuredNews[2]?._id} item={featuredNews[2] || {}}/>
                </div>
                <div className="cursor-pointer" onClick={()=>{handleReadMore(featuredNews[3]._id)}}>
                <NewsCard key={featuredNews[3]?._id} item={featuredNews[3] || {}}/>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;