import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArticleTwo = () => {
    const id = "67d6a0febd1a71723bfe3b67";
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
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-2">
                <span className="uppercase text-yellow-400 font-medium text-sm tracking-wider">TODAY</span>
            </div>
            
           

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Text Content */}
                <div className="lg:w-1/3">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        {article.title}
                    </h2>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {article.content ? article.content.substring(0, 300) + "..." : "Article content not available"}
                    </p>
                    
                    <div className="mb-8">
                        <button
                            onClick={handleReadMore}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-md inline-flex items-center"
                        >
                            Read Full Article
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "Date unavailable"}</span>
                    </div>
                    
                   
                </div>
                
                {/* Right Column - Image */}
                <div className="lg:w-2/3 relative">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                            src={article.imageUrl || "https://i.pinimg.com/736x/f6/99/b1/f699b13d9b8af3cf79d44fac352421e7.jpg"} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ArticleTwo;