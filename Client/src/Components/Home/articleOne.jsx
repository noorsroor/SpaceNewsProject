import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Articleone = () => {
    const id = "67d6a257bd1a71723bfe3b69";
    const [article, setArticle] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/ArticleDetails/${article._id}`);
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/articles/get/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching article");
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!article) return null;

    // Space-themed background image
    const backgroundImageUrl = "https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    // const backgroundImageUrl = article.featuredImage?.length > 0 
    // ?`http://localhost:8000${article.featuredImage[0]} `
    // : "/images/default-news.jpg";
    return (
        <div className="relative min-h-170">
            {/* Hero Section with Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
            </div>

            {/* Article Content Container */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>

            <div className="relative z-10 min-h-150 flex flex-col">
                {/* Main Content - Takes up most of the viewport */}
                <main className="flex-grow flex items-end">
                    <div className="container mx-auto px-8 pb-10">
                        <div className="max-w-3xl">
                            {/* Article Category Badge */}
                            <div className="mb-4">
                                <span className=" text-white text-sm font-bold px-4 py-1 rounded-full">
                                    {article.category || "FEATURED"}
                                </span>
                            </div>

                            {/* Article Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>

                            {/* Article Excerpt/Summary */}
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                                {article.content ? article.content.substring(0, 300) + "..." : "Article content not available"}
                            </p>

                            {/* Call to Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={handleReadMore}
                                    className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 font-bold transition-colors text-white px-8 py-3 rounded-full"
                                >
                                    Read Full Article
                                </button>

                            </div>

                            {/* Publication Info */}
                            <div className="mt-12 flex items-center text-gray-400">
                                <div className="flex items-center mr-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "Date unavailable"}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Articleone;