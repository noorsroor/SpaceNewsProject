import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  IoRocketOutline,
  IoEarthOutline,
  IoStarOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import logo from "../Assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-black text-[#F1F1F1]">
      {/* Top Wave Divider */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-8 pb-16 px-6 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-[#F1F1F1]/20 pb-8">
          <div className="mb-8 md:mb-0 md:max-w-xs">
            <div className="flex items-center mb-4">
              <img src={logo} alt="NASA Logo" className="w-30 " />
              <h2 className="text-2xl font-bold text-[#FDB827]">ORBITRA</h2>
            </div>
            <p className="text-[#F1F1F1]/80 text-sm">
              Delivering the latest space news, discoveries, and exploration
              updates in real time.
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-[#F1F1F1]">
                Subscribe to Updates
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#23120B]/80 text-sm rounded-l-md px-4 py-2 flex-grow text-[#F1F1F1] focus:outline-none focus:ring-2 focus:ring-[#FDB827]"
                />
                <button className="bg-[#FDB827] hover:bg-[#FDB827]/80 text-[#23120B] text-sm font-medium px-4 py-2 rounded-r-md transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Menu Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Column 1 */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center text-[#FDB827]">
                <IoNewspaperOutline className="mr-2" />
                Discover
              </h3>
              <ul className="space-y-2 text-sm text-[#F1F1F1]/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Latest News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Media Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center hover:text-[#FDB827] transition duration-300"
                  >
                    Featured Artical
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Events Calendar
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center text-[#FDB827]">
                <IoRocketOutline className="mr-2" />
                Exploration
              </h3>
              <ul className="space-y-2 text-sm text-[#F1F1F1]/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Missions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Humans in Space
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Spacecraft
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Launch Schedule
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center text-[#FDB827]">
                <IoStarOutline className="mr-2" />
                Universe
              </h3>
              <ul className="space-y-2 text-sm text-[#F1F1F1]/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Solar System
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Astrobiology & Alien Life
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Astronomy & Space Science
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDB827] transition duration-300"
                  >
                    Space Technology & Innovation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0 text-xs text-[#F1F1F1]/70">
            <a
              href="#"
              className="hover:text-[#FDB827] transition duration-300"
            >
              About
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-[#FDB827] transition duration-300"
            >
              Contact
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-[#FDB827] transition duration-300"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-[#FDB827] transition duration-300"
            >
              Terms of Use
            </a>
          </div>

          {/* Social Media */}
          <div className="flex space-x-3">
            <a
              href="#"
              className="bg-[#23120B] hover:bg-[#FDB827] p-2 rounded-full text-[#F1F1F1] hover:text-[#23120B] transition duration-300"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              className="bg-[#23120B] hover:bg-[#FDB827] p-2 rounded-full text-[#F1F1F1] hover:text-[#23120B] transition duration-300"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="#"
              className="bg-[#23120B] hover:bg-[#FDB827] p-2 rounded-full text-[#F1F1F1] hover:text-[#23120B] transition duration-300"
            >
              <FaXTwitter className="text-sm" />
            </a>
            <a
              href="#"
              className="bg-[#23120B] hover:bg-[#FDB827] p-2 rounded-full text-[#F1F1F1] hover:text-[#23120B] transition duration-300"
            >
              <FaYoutube className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
