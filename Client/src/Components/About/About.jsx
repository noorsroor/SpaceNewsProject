import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      {/* Header/Hero Section */}
      <div className="relative h-96">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Header Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="bg-[#FDB827] rounded-full h-14 w-14 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl"></span>
            </div>
            <span className="ml-3 text-white font-bold text-3xl">ORBITRA</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Cosmic Journey
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Pioneering the future of space exploration since 2018
          </p>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            At ExploreMe, we believe that space exploration is humanity's
            greatest adventure. We're dedicated to making the cosmos accessible,
            understandable, and exciting for everyone.
          </p>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#21209C]"></div>
            <div className="p-6">
              <div className="bg-[#FDB827] rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600">
                We push boundaries by developing cutting-edge technologies that
                transform our understanding of the universe.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#21209C]"></div>
            <div className="p-6">
              <div className="bg-[#FDB827] rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Discovery
              </h3>
              <p className="text-gray-600">
                We are explorers at heart, committed to uncovering the mysteries
                of space and sharing them with the world.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#21209C]"></div>
            <div className="p-6">
              <div className="bg-[#FDB827] rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We believe that space belongs to everyone, and we work with
                partners worldwide to advance our cosmic understanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <p className="text-white mb-4">
                Founded in 2018 by a team of astronauts, astrophysicists, and
                space enthusiasts, ExploreMe was born from a simple idea: space
                exploration should inspire everyone.
              </p>
              <p className="text-white mb-4">
                What started as a small educational platform has grown into a
                comprehensive space exploration company. Today, we combine
                research, education, and adventure to create meaningful
                connections between Earth and the cosmos.
              </p>
              <p className="text-white">
                As we continue to grow, our mission remains unchanged: to make
                space accessible to all and inspire the next generation of
                cosmic explorers.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600"
                alt="Team of space enthusiasts"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Our Achievements
        </h2>

        <div className="space-y-12">
          {/* Achievement 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-[#FDB827] rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <span className="text-white font-bold text-xl">01</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                First Private Lunar Analysis
              </h3>
              <p className="text-gray-600">
                In 2020, our research team conducted the first privately funded
                comprehensive analysis of lunar soil samples, revealing new
                insights about the Moon's formation.
              </p>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-[#FDB827] rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <span className="text-white font-bold text-xl">02</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Virtual Space Academy
              </h3>
              <p className="text-gray-600">
                Our educational platform has reached over 1 million students
                worldwide, offering interactive courses on astronomy,
                astrophysics, and space technology.
              </p>
            </div>
          </div>

          {/* Achievement 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-[#FDB827] rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <span className="text-white font-bold text-xl">03</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Exoplanet Detection System
              </h3>
              <p className="text-gray-600">
                In 2023, we developed a revolutionary algorithm that improves
                exoplanet detection accuracy by 42%, now used by observatories
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">Ramzi Zamil</h3>
                <p className="text-sm text-[#21209C] font-medium">
                  CEO & Founder
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Former NASA astronaut with three space missions and a Ph.D. in
                  Astrophysics.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  Ala'a Al-Saadi
                </h3>
                <p className="text-sm text-[#21209C] font-medium">
                  Chief Scientist
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Leading astrophysicist specializing in exoplanet research and
                  planetary formation.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  Lawrence Al-Khalailah
                </h3>
                <p className="text-sm text-[#21209C] font-medium">
                  Engineering Director
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Aerospace engineer with 15+ years of experience developing
                  space technologies.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  Belal Kahaleh
                </h3>
                <p className="text-sm text-[#21209C] font-medium">
                  Education Lead
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Educational innovator passionate about bringing space science
                  to classrooms worldwide.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">Noor Sroor</h3>
                <p className="text-sm text-[#21209C] font-medium">
                  Education Lead
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Educational innovator passionate about bringing space science
                  to classrooms worldwide.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  Rana Salameh
                </h3>
                <p className="text-sm text-[#21209C] font-medium">
                  Education Lead
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Educational innovator passionate about bringing space science
                  to classrooms worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Join Our Cosmic Journey
          </h2>
          <p className="text-gray-600 mb-8">
            Ready to explore the universe with us? Become part of our community
            of space enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-[#21209C] hover:bg-[#191583] text-white font-medium py-3 px-8 rounded-md transition duration-300"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Join over 10,000 space enthusiasts who have already embarked on this
            journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
