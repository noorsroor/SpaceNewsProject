import React from "react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <div className="relative w-full h-screen md:h-[500px] mb-15">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/9686493/9686493-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <img
            src="/path-to-nebula-image.jpg"
            alt="Cosmic Nebula"
            className="absolute min-w-full min-h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Explore the Universe from your Inbox
            </h2>
            <p className="text-white text-base md:text-lg mb-4 leading-relaxed">
              Stay up-to-date on the latest news from ORBITRA—from Earth to the
              Moon, the Solar System and beyond.
            </p>
            <p className="text-white text-sm mb-6"></p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/Register"
                className="flex items-center justify-center bg-white hover:bg-yellow-400 transition-colors duration-300 text-black font-bold py-3 px-6 rounded-full"
              >
                Sign up for Updates
              </Link>

              <Link
                to="/ToBeJournalist"
                className="flex items-center justify-center bg-white hover:bg-yellow-400 transition-colors duration-300 text-black font-bold py-3 px-6 rounded-full"
              >
                Become a Journalist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
