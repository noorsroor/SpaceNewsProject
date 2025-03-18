import React from 'react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'The Solar System',
      image: 'https://i.pinimg.com/736x/7e/77/de/7e77defe8ea11cd34dfad78145050b8d.jpg',
      path: '/Categories',
    },
    {
      id: 2,
      title: 'Astrobiology & Alien Life',
      image: 'https://i.pinimg.com/736x/a6/eb/bd/a6ebbd4306c4eaeae87243068efc4d5e.jpg',
      path: '/Categories',
    },
    {
      id: 3,
      title: 'Space Innovation',
      image: 'https://i.pinimg.com/736x/96/07/fc/9607fc4cfbaa472e32f10bb71a9ab81f.jpg',
      path: '/Categories',
    },
    {
      id: 4,
      title: 'Astronomy & Space Science',
      image: 'https://i.pinimg.com/736x/b5/fd/1b/b5fd1bf4b10579def9c8faf1e4a9cb4b.jpg',
      path: '/Categories',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-gray-900 text-center">
        The Orbital Zones
      </h1>

      {/* Grid for Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative overflow-hidden rounded-lg group h-64 sm:h-80 lg:h-96 bg-black"
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-end justify-between p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                {category.title}
              </h2>

              {/* Arrow Icon */}
              <div className="flex items-center">
                <span className="invisible"></span>
                <div className="flex justify-center items-center bg-[#FDB827] rounded-full w-8 h-8 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Link to Category */}
            <a
              href={category.path}
              className="absolute inset-0"
              aria-label={`View ${category.title}`}
            ></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;