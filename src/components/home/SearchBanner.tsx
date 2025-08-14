import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';

export function SearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white">
      {/* Top Info Bar */}
      <div className="bg-black/20 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <FiTruck className="w-4 h-4" />
                <span>Free delivery over KSH 50,000</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiShield className="w-4 h-4" />
                <span>100% Genuine Products</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <FiHeadphones className="w-4 h-4" />
              <span>24/7 Customer Support: +254 700 000 000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Section - Centered like Temu */}
      <div className="py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo/Brand - Centered */}
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                <span className="text-white">Rurident</span>
                <span className="text-orange-200"> Health Supplies</span>
              </div>
              <p className="text-orange-100 text-sm">Your trusted partner in dental healthcare</p>
            </div>
            
            {/* Enhanced Search Bar - Centered and Prominent */}
            <div className="w-full max-w-4xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex rounded-2xl overflow-hidden shadow-2xl">
                  <select className="bg-gray-100 text-gray-900 px-4 py-4 border-r border-gray-300 text-sm focus:outline-none hover:bg-gray-50 transition-colors">
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
                    className="flex-1 px-6 py-4 text-gray-900 focus:outline-none placeholder-gray-500 text-lg"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 px-8 py-4 transition-colors group"
                  >
                    <FiSearch className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Location Info - Centered */}
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
              <FiMapPin className="w-4 h-4 mr-2" />
              <div className="text-center">
                <div className="text-xs text-orange-200">Deliver to</div>
                <div className="font-medium">Kenya - All Counties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}