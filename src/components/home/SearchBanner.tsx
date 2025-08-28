import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiShield, FiTruck, FiHeadphones, FiChevronDown } from 'react-icons/fi';

export function SearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query using React Router
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('deals-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      {/* Mobile-First Search Section */}
      <div className="py-4 md:py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4">
            {/* Hero Title - Updated with Animation */}
            <div className="text-center md:text-left animate-fade-in-scale">
              <div className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight">
                <span className="text-white">Your Online Destination for</span>
                <br />
                <span className="text-orange-200">high quality Dental equipment</span>
                <br />
                <span className="text-white">(all in one place)</span>
              </div>
              <p className="text-orange-100 text-base md:text-lg font-medium">Your trusted partner in dental healthcare</p>
            </div>
            
            {/* Enhanced Search Bar - Mobile Optimized */}
            <div className="w-full max-w-full overflow-hidden">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="flex rounded-xl overflow-hidden shadow-lg w-full">
                  <select className="bg-gray-100 text-gray-900 px-3 py-3 border-r border-gray-300 text-sm focus:outline-none hover:bg-gray-50 transition-colors min-w-0 hidden sm:block flex-shrink-0">
                    <option>All Categories</option>
                    <option>Dental Chairs</option>
                    <option>Equipment</option>
                    <option>Consumables</option>
                    <option>Student Kits</option>
                    <option>Orthodontics</option>
                    <option>Endodontics</option>
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for dental equipment, chairs, consumables..."
                    className="flex-1 px-4 py-3 text-gray-900 focus:outline-none placeholder-gray-500 text-sm md:text-base min-w-0 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 px-6 py-3 transition-colors group flex-shrink-0"
                  >
                    <FiSearch className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Location Info - Mobile Compact */}
            <div className="flex items-center justify-center md:justify-start bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm w-fit mx-auto md:mx-0">
              <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <div className="text-center md:text-left">
                <div className="text-xs text-orange-200">We make</div>
                <div className="font-medium text-sm">Countrywide deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip - Mobile Optimized */}
      <div className="bg-black/10 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center md:justify-between text-xs space-x-4 md:space-x-6">
            <div className="flex items-center space-x-1">
              <FiTruck className="w-3 h-3" />
              <span>Free delivery</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <FiShield className="w-3 h-3" />
              <span>100% Genuine Products</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              <FiHeadphones className="w-3 h-3" />
              <span>24/7 Support: +254 700 000 000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
          <button
            onClick={scrollToNextSection}
            className="group flex flex-col items-center animate-bounce hover:animate-none cursor-pointer bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label="Scroll down to learn more"
          >
            <span className="text-orange-600 text-xs font-medium mb-1 whitespace-nowrap">Scroll down to learn more</span>
            <FiChevronDown className="w-5 h-5 text-orange-600 group-hover:transform group-hover:translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}