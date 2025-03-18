import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/854224/854224-hd_1280_720_30fps.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="/path-to-fallback-image.jpg"
            alt="SpaceX Rocket Launch"
            className="absolute min-w-full min-h-full object-cover"
          />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ORBITRA – Your Portal to the Cosmos
            </h1>
            <p className="text-white text-base md:text-lg mb-8 leading-relaxed">
              From the latest space missions to groundbreaking astronomical discoveries, ORBITRA keeps you connected to the universe. Explore breaking news, deep-space insights, and cosmic wonders—all in one orbit. Join us as we uncover the mysteries of the stars, planets, and galaxies beyond!
            </p>
            <Link
                to="/Categories"
                class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#FDB827] backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl  border border-white/20"
              >
                <span class="text-lg">Stay in Orbit</span>
                <div
                  class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                >
                  <div class="relative h-full w-10 bg-white/30"></div>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;