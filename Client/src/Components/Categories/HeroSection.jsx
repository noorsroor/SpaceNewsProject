import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-120">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/12275368/12275368-hd_1920_1028_60fps.mp4" type="video/mp4" />
        </video>
      </div>

      

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-xl">
            <span className="inline-block text-sm md:text-base text-white/90 uppercase tracking-wider mb-2">
            Breaking News, Fresh Perspectives
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Get the latest headlines, in-depth reports, and exclusive stories. Start exploring now!
            </h1>
            <Link
              to="/article"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
            >
              READ ARTICLE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;