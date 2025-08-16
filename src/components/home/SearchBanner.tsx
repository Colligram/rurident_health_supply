import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';

export function SearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Perform search functionality here instead of redirecting
      console.log('Searching for:', searchQuery.trim());
      // TODO: Implement search functionality
      // This could trigger a search modal, filter products, etc.
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      {/* Mobile-First Search Section */}
      <div className="py-4 md:py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4">
            {/* Logo/Brand - Mobile Compact */}
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-bold mb-1">
                <span className="text-white">Rurident</span>
                <span className="text-orange-200"> Health Supplies</span>
              </div>
              <p className="text-orange-100 text-sm">Your trusted partner in dental healthcare</p>
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
                <div className="text-xs text-orange-200">Deliver to</div>
                <div className="font-medium text-sm">Countrywide</div>
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
              <span className="hidden sm:inline">Free delivery over KSH 50,000</span>
              <span className="sm:hidden">Free delivery</span>
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
    </div>
  );
}